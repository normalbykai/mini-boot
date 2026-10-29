@echo off
chcp 65001 >nul
rem 可选：用本地 HTTP 服务打开（默认 http://127.0.0.1:8899/）
cd /d "%~dp0"
echo 正在启动本地服务：http://127.0.0.1:8899/
echo 关闭本窗口即停止服务。
start "" "http://127.0.0.1:8899/"
python -m http.server 8899
