# 🏢 Inventory Management System (IMS)

A **Modern, Secure, and Intelligent Inventory Management System** built using **React, Node.js, Express, Tailwind CSS, and Vite**.  
Designed to streamline inventory tracking, automate approval workflows, and enhance accountability across multiple user roles.

---

## 🚀 Tech Stack

| Frontend | Backend | Database | UI | Tools |
|-----------|----------|-----------|------|--------|
| React + Vite | Node.js + Express | MySQL  | Tailwind CSS | JWT, 2FA, Nodemailer |

---

## 👥 System Actors

The system has **6 main roles**, each with specific privileges and workflows.

### 🧑‍💼 1. Admin
- Create, edit, delete, activate, or deactivate users  
- Manage user roles and permissions  
- View and generate user activity reports  
- Handle **bulk user uploads (CSV)**  
- Enable **2FA (Two-Factor Authentication)** for enhanced security  

---

### 🧑‍🔧 2. Clerk
- Add, delete, and view items  
- Manage item categories and serial numbers  
- Generate **paper reports** and **record reports**  
- Record item transactions (issue/return)  
- Send reports to the Manager for review  

---

### 👨‍💼 3. Manager
- Receive notifications for staff requests  
- **Approve** or **Reject** item requests  
- Generate summary and analytics reports  
- Oversee Clerk and ICT Clerk operations  
- Manage chatbot data for system queries  

---

### 👨‍💻 4. Staff
- Register via email (with **email verification**)  
- Secure login with **Two-Factor Authentication (2FA)**  
- Request items by staff ID  
- Receive **real-time notifications** for approvals or rejections  
- Return items and track status updates  

---

### 🧑‍💻 5. ICT Clerk
- Verify **returned items** and inspect their condition  
- Approve or decline return requests based on inspection  
- Update item condition status and system records  

---

### 🌐 6. Guest
- Access public landing page  
- Receive responses via **email notification**  
- View limited system information  

---

## 🔄 System Workflow

```mermaid
flowchart TD
    A[Staff Registration] --> B[Email Verification]
    B --> C[Two-Factor Authentication]
    C --> D[Admin Assigns Role & Privilege]
    D --> E[Staff Requests Item]
    E --> F[Manager Reviews Request]
    F -->|Approved| G[Clerk Processes Item]
    F -->|Declined| H[Staff Notified of Rejection]
    G --> I[Item Issued to Staff]
    I --> J[Staff Returns Item]
    J --> K[ICT Clerk Inspects Condition]
    K -->|Approved| L[Manager Confirms Return]
    K -->|Declined| M[Staff Notified for Recheck]




Features

✅ Role-Based Access Control (RBAC)
✅ Two-Factor Authentication (2FA)
✅ Email Verification & Notifications
✅ Barcode System for item tracking
✅ Dynamic Reporting & Data Analytics

⚙️ Installation & Setup
 Clone the Repository
git clone https://github.com/yohannes369/IMSP.git
cd IMS




👨‍💻 Author

👤 Yohannes Yeneakal Teshome