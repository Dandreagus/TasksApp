import { Picker } from "react-native";

import React from "react";

function Filter({ selectedValue, setSelectedValue }) {
  return (
    <Picker
      selectedValue={selectedValue}
      style={{ height: 50, width: 135, color: "white" }}
      onValueChange={(itemValue) => setSelectedValue(itemValue)}
    >
      <Picker.Item label="Todas" value="todas" />
      <Picker.Item label="Activas" value="Activa" />
      <Picker.Item label="Completadas" value="Completada" />
    </Picker>
  );
}

export default Filter;
