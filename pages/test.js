// pages/index.js
import React, { useState } from "react";
import { Modal } from "antd";

export default function Home() {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const handleCancel = () => setVisible(false);

  return (
    <div>
      <button onClick={showModal}>Open Modal</button>
      <Modal title="Ant Design Modal" visible={visible} onCancel={handleCancel}>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
}
