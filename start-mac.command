#!/bin/bash
cd "$(dirname "$0")"

echo ""
echo "============================================"
echo " Campus Events - Starting local server..."
echo "============================================"
echo ""

if command -v python3 &> /dev/null; then
    echo "[OK] Python found"
    echo ""
    echo "URL: http://localhost:8000"
    echo ""
    echo "============================================"
    echo " Close this window or Ctrl+C to stop"
    echo "============================================"
    echo ""
    sleep 2
    open http://localhost:8000
    python3 -m http.server 8000
    exit
fi

if command -v python &> /dev/null; then
    echo "[OK] Python found"
    sleep 2
    open http://localhost:8000
    python -m SimpleHTTPServer 8000
    exit
fi

echo "[X] Python not found"
echo ""
echo "Mac usually has Python 3 preinstalled. Try in Terminal:"
echo "    python3 --version"
echo "If not, install from https://www.python.org/downloads/"
echo ""
read -p "Press Enter to close..."
