import { Card } from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import React from "react";

const PatientNote = () => {
  return (
    <Card
      style={{
        marginTop: 26,
      }}
    >
      <Title level={3}>Patient Note</Title>
      <TextArea
        disabled={true}
        value={
          "Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis"
        }
      />
    </Card>
  );
};

export default PatientNote;
