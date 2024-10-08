<div align="center">
    <img src="./public/images/email-service.png"
    width="200" style="clip-path: circle(50% at 50% 50%);
">
</div>

# Email Service

This is an email service built using Node.js and Kafka. The service handles sending and prioritizing email messages, including features for high and low priority email processing.

## Features

- **Send Emails**: Send email messages based on provided templates and priorities.
- **Priority Handling**: Differentiate between high and low priority emails.
- **Kafka Integration**: Utilize Kafka for managing and processing email messages.

## Prerequisites

- Node.js (v20.15.0 or later)
- Kafka (v3.8.0 or later)

## Installation

### 📦 Using Docker


1. **Clone the repository**:

   ```bash
   git clone https://github.com/LakshayManglani/email-service.git
   cd email-service
   ```

2. **Set up environment variables:**

   1. Create two environment files: .env for production and .env.dev for development.
   2. Copy the content of .env.sample into both .env and .env.dev.
   3. Replace the placeholder values with your actual environment credentials.

3. **Run the Docker containers:**

   For development:
      ```bash
      docker compose -f docker-compose.dev.yml up -d
      ```
   For production:
      ```bash
      docker compose up -d
      ```

### 💻 Running locally

1. **Clone the repository**:

   ```bash
   git clone https://github.com/LakshayManglani/email-service.git
   cd email-service
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   1. Create a .env file in the root directory.
   2. Copy the content from .env.sample into .env.
   3. Replace the placeholder values with your actual environment credentials.

4. **Start the service:**
   ```bash
   npm start
   ```

## How to contribute

We welcome contributions from the community. Please follow these steps to contribute:

1. **Fork the repository**
2. **Create a new branch**:
   ```bash
   git checkout -b feat/feature-branch-name
   ```
3. **Make your changes and commit them**:
   ```bash
   git commit -m "feat(scope): description of changes"
   ```
4. **Push to the branch**:
   ```bash
   git push origin feat/feature-branch-name
   ```
5. **Create a pull request** detailing your changes.

For more details on the commit format and other guidelines, please refer to the [Contributor Guidelines](./CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or issues, please open an issue on GitHub or reach out to us using the following email addresses:

[@JayashSaini](https://github.com/JayashSaini/):
**[jayashysaini7361@gmail.com](mailto:jayashysaini7361@gmail.com)**

[@LakshayManglani](https://github.com/LakshayManglani):
**[lakshaymanglani2212@gmail.com](mailto:lakshaymanglani2212@gmail.com)**

---

Thank you for using our Service! We hope it helps you.