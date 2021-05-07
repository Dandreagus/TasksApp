import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
  Picker,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Filter from "./componets/Filter";
import { Button, IconButton } from "react-native-paper";
import { Appbar, TouchableRipple } from "react-native-paper";

export default function App() {
  const [tasks, setTasks] = useState([
    { name: "Limpiar", encargado: "Gustavo", estado: "Activa" },
    { name: "Comprar", encargado: "Florencia", estado: "Completada" },
    { name: "Alimentar", encargado: "Gisela", estado: "Activa" },
  ]);
  const [selectedValue, setSelectedValue] = useState("todas");
  const [taskFilter, setTaskFilter] = useState([]);

  const [modalVis, setModalVis] = useState(false);
  const [addTask, setAddTask] = useState({
    estado: "Activa",
  });

  const deleteTask = (task) => {
    setTasks(tasks.filter((e) => e.name !== task));
  };

  const addCancel = () => {
    setModalVis(!modalVis);
  };

  const handleSubmit = () => {
    if (!addTask.name || !addTask.encargado || !addTask.estado) {
      return Alert.alert("Todos los campos son obligatorios");
    }
    Alert.alert("Tarea Agregada");
    console.log(addTask);
    setTasks([...tasks, addTask]);
    setModalVis(!modalVis);
    setAddTask({
      estado: "Activa",
    });
  };

  const handleModif = (task) => {
    const taskModif = tasks.find((x) => x === task);
    if (taskModif.estado === "Completada") {
      taskModif.estado = "Activa";
      setTasks([...tasks]);
    } else {
      taskModif.estado = "Completada";
      setTasks([...tasks]);
    }
  };

  useEffect(() => {
    if (selectedValue === "todas") {
      setTaskFilter(tasks);
    }
    const tasksFilter = tasks.filter((x) => x.estado === selectedValue);
    setTaskFilter(tasksFilter);
  }, [selectedValue]);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ width: "100%", height: "100%" }}
        source={require("./images/unnamed.jpg")}
      >
        <ScrollView>
          <Appbar.Header style={{ backgroundColor: "#2E86C1" }}>
            <Filter
              setSelectedValue={setSelectedValue}
              selectedValue={selectedValue}
            />
            <Appbar.Content title="Mis tareas" />
            <Appbar.Action icon="dots-vertical" />
          </Appbar.Header>

          <View style={styles.navTasks}>
            <Text style={styles.taskList}>Tarea</Text>
            <Text style={styles.taskList}>Encargado</Text>
            <Text style={styles.taskList}>Estado</Text>
          </View>
          <View>
            {taskFilter.length === 0
              ? tasks.map((x) => (
                  <View key={x.name} style={styles.taskContainer}>
                    <Text style={styles.task}>{x.name}</Text>
                    <Text style={styles.task}>{x.encargado}</Text>
                    <TouchableOpacity
                      onPress={() => handleModif(x)}
                      style={styles.task}
                    >
                      <Text
                        style={
                          x.estado == "Completada"
                            ? { color: "black" }
                            : { color: "green" }
                        }
                      >
                        {x.estado}
                      </Text>
                    </TouchableOpacity>
                    <AntDesign
                      onPress={() => deleteTask(x.name)}
                      name="delete"
                    />
                  </View>
                ))
              : taskFilter.map((x) => (
                  <View key={x.name} style={styles.taskContainer}>
                    <Text style={styles.task}>{x.name}</Text>
                    <Text style={styles.task}>{x.encargado}</Text>
                    <TouchableOpacity
                      onPress={() => handleModif(x)}
                      style={styles.task}
                    >
                      <Text
                        style={
                          x.estado == "Completada"
                            ? { color: "black" }
                            : { color: "green" }
                        }
                      >
                        {x.estado}
                      </Text>
                    </TouchableOpacity>
                    <AntDesign
                      onPress={() => deleteTask(x.name)}
                      name="delete"
                    />
                  </View>
                ))}
          </View>
          <Modal visible={modalVis}>
            <View style={styles.form}>
              <TextInput
                placeholder="Nombre de la tarea"
                style={styles.input}
                onChangeText={(val) => setAddTask({ ...addTask, name: val })}
              />
              <TextInput
                placeholder="Encargado"
                style={styles.input}
                onChangeText={(val) =>
                  setAddTask({ ...addTask, encargado: val })
                }
              />

              <TouchableOpacity>
                <Text onPress={() => handleSubmit()} style={styles.add}>
                  Agregar Tarea
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text onPress={addCancel} style={styles.cancel}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </ScrollView>
        <View style={styles.addTask}>
          {/*       <TouchableOpacity onPress={addCancel}>
            <Text style={{ color: "white" }}>Agregar una Tarea</Text>
          </TouchableOpacity> */}
          <Button
            onPress={addCancel}
            style={{ color: "#2E86C1", backgroundColor: "white" }}
            icon="folder-plus-outline"
            labelStyle={{ color: "#2E86C1" }}
          >
            <Text style={{ color: "#2E86C1" }}>Agregar una Tarea</Text>
          </Button>
        </View>

        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
  nav: {
    flexDirection: "row",
    backgroundColor: "#2E86C1",
    padding: 20,
    width: "100%",
  },
  touch: {
    width: "25%",
    fontWeight: "900",
  },
  touchFirst: {
    marginLeft: 15,
    width: "25%",
    fontWeight: "900",
  },
  tasks: {
    color: "red",
    textAlign: "center",
    paddingTop: 20,
    fontWeight: "bold",
    marginBottom: 15,
    borderBottomWidth: 0.5,
    alignSelf: "center",
  },
  navTasks: {
    marginTop: 15,
    flexDirection: "row",
    backgroundColor: "#A37CBB",
    textAlign: "center",
  },
  taskList: {
    width: "30%",
    padding: 12,
    fontWeight: "bold",
  },
  taskContainer: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
  },
  task: {
    width: "32%",
  },
  form: {
    marginTop: 120,
    paddingTop: 100,
    paddingBottom: 100,
    alignItems: "center",

    justifyContent: "center",
  },
  add: {
    backgroundColor: "#2E86C1",
    color: "white",
    width: 120,
    textAlign: "center",
    marginTop: 5,
  },
  cancel: {
    color: "white",
    backgroundColor: "#A37CBB",
    width: 120,
    textAlign: "center",
    marginTop: 10,
  },
  addTask: {
    marginTop: "auto",
    alignItems: "center",
    backgroundColor: "#2E86C1",
    padding: 20,
  },
  input: {
    width: 130,
    height: 50,
    borderBottomWidth: 1.0,
  },
});
