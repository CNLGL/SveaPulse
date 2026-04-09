# Komutlar
NPM = npm
PYTHON = python3

.PHONY: install run push help

help:
	@echo "Kullanılabilir komutlar:"
	@echo "  make install  - Tüm bağımlılıkları (Root, Frontend, Backend) kurar"
	@echo "  make run      - Backend ve Frontend'i aynı anda çalıştırır"
	@echo "  make push     - Kodları ekler, commitizen'i açar ve github'a gönderir"

install:
	@echo "📦 Paketler yükleniyor..."
	$(NPM) install
	cd frontend && $(NPM) install
	cd backend && pip install -r requirements.txt
	@echo "✅ Kurulum tamam!"

run:
	@echo "⚡ Sistem başlatılıyor..."
	# Backend'i arka planda başlat, Frontend'i ön planda çalıştır
	(cd backend && $(PYTHON) main.py & cd frontend && $(NPM) run dev)

push:
	@echo "🛠️ Git süreci başlatılıyor..."
	git add .
	$(NPM) run cz
	git push origin main
