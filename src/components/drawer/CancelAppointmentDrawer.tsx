/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Drawer, Input, Button, Collapse } from "antd";
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
const { Panel } = Collapse;

const CancelAppointmentDrawer = ({
  open,
  onClose,
  appointment,
  onDelete,
}: {
  open: boolean;
  onClose: () => void;
  appointment: any;
  onDelete: any;
}) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const suggestedReasons = [
    "He can't attend due to personal reason",
    "He can't attend due to personal reason",
    "He can't attend due to personal reason",
  ];

  const handleSubmit = () => {
    const reason = customReason || selectedReason;
    onDelete(appointment.id, reason);
    onClose();
  };

  const handleCancel = () => {
    setSelectedReason("");
    setCustomReason("");
    onClose();
  };


  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  const onChange = (keys: string | string[]) => {
    if (Array.isArray(keys)) setActiveKeys(keys);
    else setActiveKeys([keys]);
  };
  return (
    <Drawer
      title={
        <div
          style={{
            textAlign: "start",
            width: "100%",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#1f2937",
          }}
        >
          Cancel Appointment
        </div>
      }
      placement="right"
      onClose={handleCancel}
      open={open}
      width={400}
      closable={false}
      extra={
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={handleCancel}
          style={{ color: "#6b7280" }}
        />
      }
      footer={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "24px",
            padding: "16px 24px",
          }}
        >
          <Button
            onClick={handleSubmit}
            type="primary"
            size="large"
            style={{
              minWidth: 120,
              height: 44,
              borderRadius: "8px",
              fontWeight: 500,
            }}
            disabled={!customReason && !selectedReason}
          >
            Submit
          </Button>
          <Button
            size="large"
            style={{
              minWidth: 120,
              height: 44,
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              color: "#4b5563",
              fontWeight: 500,
            }}
            onClick={handleCancel}
          >
            Not Now
          </Button>
        </div>
      }
      bodyStyle={{
        padding: "24px",
        backgroundColor: "#ffffff",
      }}
    >
      <div style={{ padding: "10px 0" }}>
        {/* Suggest Reasons Section */}
        <div style={{ marginBottom: "32px" }}>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: 600,
              marginBottom: "16px",
              color: "#374151",
            }}
          >
            Suggest Reasons
          </h3>
          <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px" }}>
            <Collapse
              activeKey={activeKeys}
              onChange={onChange}
              expandIconPosition="end"
              ghost
              expandIcon={({ isActive }) =>
                isActive ? (
                  <UpOutlined style={{ fontSize: 14, color: "#374151" }} />
                ) : (
                  <DownOutlined style={{ fontSize: 14, color: "#9ca3af" }} />
                )
              }
            >
              {suggestedReasons.map((reason, index) => (
                <Panel
                  header={<span style={{ fontSize: 14 }}>{reason}</span>}
                  key={index.toString()}
                  style={{
                    borderBottom:
                      index < suggestedReasons.length - 1
                        ? "1px solid #f3f4f6"
                        : "none",
                    backgroundColor: "#fff",
                  }}
                >
                  <p style={{ margin: 0, fontSize: 13, color: "#4b5563" }}>
                    {/* You can put detailed content here if needed */}
                    Detailed explanation for {reason} goes here.
                  </p>
                </Panel>
              ))}
            </Collapse>
          </div>
        </div>

        {/* Cancellation Reason Section */}
        <div>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: 600,
              marginBottom: "16px",
              color: "#374151",
            }}
          >
            Cancellation Reason
          </h3>
          <div
            style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}
          >
            <Input.TextArea
              placeholder="e.g. He can't attend due to personal reason"
              value={customReason}
              onChange={(e) => {
                setCustomReason(e.target.value);
                setSelectedReason(e.target.value ? "custom" : "");
              }}
              rows={4}
              style={{
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                padding: "12px",
                fontSize: "14px",
                resize: "vertical",
              }}
            />
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default CancelAppointmentDrawer;
