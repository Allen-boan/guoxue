"""在 GitHub runner 上验收实际发布的页面与首页资源。仅使用 Python 标准库。"""

import os
import re
import time
from html import unescape
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen


base = os.environ["SITE_URL"].rstrip("/") + "/"
if urlparse(base).scheme != "https":
    raise ValueError("验收地址必须是 HTTPS")

routes = [
    "", "start/", "charter/", "principles/", "practice/",
    "practice/water", "practice/sleep", "practice/lean-muscle",
    "practice/housing", "practice/secondhand", "practice/renting",
    "new/", "decisions/", "identity/", "dictionary/", "counterexamples/",
    "about/", "maintenance",
]


def fetch(url, attempts=2):
    for attempt in range(attempts):
        try:
            request = Request(url, headers={"User-Agent": "Guoxue-Pages-Verification/1.0"})
            with urlopen(request, timeout=10) as response:
                if response.status != 200:
                    raise RuntimeError(f"HTTP {response.status}: {url}")
                return response.read().decode("utf-8"), response.headers.get_content_type()
        except Exception:
            if attempt + 1 == attempts:
                raise
            time.sleep(5)


homepage = None
for route in routes:
    url = urljoin(base, route)
    body, content_type = fetch(url, attempts=10 if not route else 2)
    if content_type != "text/html" or "过学" not in body:
        raise RuntimeError(f"页面内容异常: {url}")
    if not route:
        homepage = body
        if "精神总部" not in body:
            raise RuntimeError("首页没有呈现精神总部内容")
    if route == "practice/lean-muscle" and "BV1xa4k6vEpp" not in body:
        raise RuntimeError("薄肌页面缺少已核实的一手来源")
    print(f"PASS 页面 {url}")

assets = []
for pattern in [r'href="([^"]+\.css)"', r'src="([^"]+\.js)"']:
    matches = re.findall(pattern, homepage)
    if not matches:
        raise RuntimeError("首页缺少样式或脚本资源")
    assets.append(urljoin(base, unescape(matches[0])))
for url in assets:
    if urlparse(url).netloc != urlparse(base).netloc:
        raise RuntimeError(f"首页资源不在本站: {url}")
    body, content_type = fetch(url)
    if not body.strip() or content_type == "text/html":
        raise RuntimeError(f"首页资源响应异常: {url}")
    print(f"PASS 资源 {url}")

result = f"官网验收通过：{len(routes)} 个页面、{len(assets)} 个首页资源。"
print(result)
if os.environ.get("GITHUB_STEP_SUMMARY"):
    with open(os.environ["GITHUB_STEP_SUMMARY"], "a", encoding="utf-8") as summary:
        summary.write(f"{result}\n\n官网：{base}\n")
