<div align="center">

# 🚀 SveaPulse

**Fullstack Sensor Analytics Platform**

An end-to-end tracking system that collects sensor data with **FastAPI**, serves it with **Next.js**, and analyzes it with **Grafana**.

![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

</div>

---

## 📋 Table of Contents

- [Setup](#️-setup)
  - [1. Clone the Repository](#step-1-clone-the-repository)
  - [2. Install Dependencies](#step-2-install-dependencies)
  - [3. Grafana Setup](#step-3-grafana-setup--launch)
  - [4. Database Permissions](#step-4-database-permissions-critical)
  - [5. Configure Data Source](#step-5-configure-grafana-data-source)
  - [6. Launch the System](#step-6-launch-the-system)
- [Development](#-development--push)

---

## 🛠️ Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/CNLGL/SveaPulse.git
cd SveaPulse
```

---

### Step 2: Install Dependencies

```bash
make install
```

---

### Step 3: Grafana Setup & Launch

> If Grafana is not installed on your system, follow the steps below.

**Install on Ubuntu / Debian:**

```bash
sudo apt-get install -y apt-transport-https software-properties-common wget
sudo wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/release/ubuntu stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt-get update && sudo apt-get install grafana
```

**Start the service and enable it on boot:**

```bash
sudo systemctl start grafana-server
sudo systemctl enable grafana-server
```

---

### Step 4: Database Permissions *(Critical)*

> ⚠️ These permissions are **required** for Grafana to access the database.

```bash
# Prepare the directory and file
sudo mkdir -p /var/lib/grafana
sudo touch /var/lib/grafana/sveapulse.db

# Set permissions
sudo chmod 755 /var/lib/grafana
sudo chmod 664 /var/lib/grafana/sveapulse.db
sudo chown grafana:grafana /var/lib/grafana/sveapulse.db 2>/dev/null || true
```

---

### Step 5: Configure Grafana Data Source

1. Open [http://localhost:3000](http://localhost:3000) in your browser.
2. Go to **Data Sources** → **Add Data Source** → select **SQLite**.
3. In the **Path** field, enter:
   ```
   /var/lib/grafana/sveapulse.db
   ```
4. Click **Save & Test**.

---

### Step 6: Launch the System

```bash
make run
```

---

## 📤 Development & Push

To push changes following professional standards:

```bash
make push
```

---

<div align="center">

Made with ❤️ by the **SveaPulse Team**

</div>