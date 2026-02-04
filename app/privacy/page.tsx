import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px", fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif", lineHeight: 1.6 }}>
      <h1>SnapStock — Privacy Policy</h1>
      <p><strong>Last Updated:</strong> 2026-02-04</p>

      <p>
        This Privacy Policy explains how SnapStock, Inc. (“SnapStock”) collects, uses, and protects your
        information when you use the SnapStock app.
      </p>

      <h2>1. Information We Collect</h2>

      <h3>a. Information You Provide</h3>
      <ul>
        <li>Name</li>
        <li>Email address</li>
        <li>Team name</li>
        <li>Inventory data you input or upload</li>
      </ul>

      <h3>b. Information We Do NOT Store</h3>
      <ul>
        <li>Photos you upload for scanning</li>
        <li>Raw image files</li>
        <li>Camera footage</li>
        <li>We do not store payment information ourselves however our payment provider does. Please refer to <Link href={"https://stripe.com/privacy"} className="underline">their privacy policy</Link> for details.</li>
      </ul>
      <p>Images are only processed temporarily to perform a scan and are then discarded.</p>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>Provide inventory tracking</li>
        <li>Operate and improve SnapStock</li>
        <li>Process payments</li>
        <li>Communicate with you about your account</li>
        <li>Prevent fraud and abuse</li>
      </ul>
      <p>We do not sell your personal data.</p>

      <h2>3. Team Data & Sharing</h2>
      <ul>
        <li>Your data is isolated to your team.</li>
        <li>Other teams cannot access your data.</li>
        <li>We will not share your data with other customers.</li>
      </ul>

      <h2>4. Third-Party Services</h2>
      <p>
        We may use trusted third parties for payment processing, cloud hosting, and analytics. These
        providers only access your data as necessary to perform their functions.
      </p>

      <h2>5. Data Security</h2>
      <p>
        We take reasonable technical and organizational measures to protect your data, including
        encryption in transit and access controls. However, no system is 100% secure.
      </p>

      <h2>6. Data Retention</h2>
      <p>
        We keep your inventory data as long as your account is active. If you delete your account, your
        data will automatically be deleted from our servers within 30 days.
      </p>

      <h2>7. Your Rights</h2>
      <p>You may:</p>
      <ul>
        <li>Request a copy of your data</li>
        <li>Request correction of your data</li>
        <li>Request deletion of your account and data</li>
      </ul>
      <p>
        Contact us at{" "}
        <a href="mailto:support@snapstock.io">support@snapstock.io</a> to exercise these rights.
      </p>

      <h2>8. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify users of significant changes.
      </p>

      <h2>9. Contact</h2>
      <p>
        Email: <a href="mailto:support@snapstock.io">support@snapstock.io</a>
        <br />
      </p>
    </div>
  );
}
