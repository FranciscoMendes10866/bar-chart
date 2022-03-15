import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import data from "./data";

const chartHeight = 270;
const bottomAxisHeight = 10;
const xAxisElements = data.xAxis.length;
const chartSpacing = 20;

export default function App() {
  const [selected, setSelected] = useState(
    0 || data.yAxis.findIndex((item) => item.isToday === true)
  );

  const [dimensions, setDimensions] = useState({
    chart: {
      width: 0,
      height: 0,
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View
        style={styles.chartBG}
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setDimensions({
            ...dimensions,
            chart: {
              width,
              height,
            },
          });
        }}
      >
        <View
          style={[
            {
              width: dimensions.chart.width - chartSpacing,
              height: dimensions.chart.height - chartSpacing,
              marginLeft:
                dimensions.chart.width / 2 -
                (dimensions.chart.width - chartSpacing) / 2,
              marginTop:
                dimensions.chart.height / 2 -
                (dimensions.chart.height - chartSpacing) / 2,
            },
            styles.innerChartWrapper,
          ]}
        >
          <View style={styles.columnWrapper}>
            {data.yAxis.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelected(index)}
                style={[
                  {
                    height:
                      (dimensions.chart.height -
                        chartSpacing / 2 -
                        bottomAxisHeight) *
                      item.productivity_percent,
                    width:
                      (dimensions.chart.width - chartSpacing) / xAxisElements -
                      12,
                  },
                  selected === index ? styles.todaysBG : styles.notTodayBG,
                  styles.chartColumn,
                ]}
              />
            ))}
          </View>
          <View
            style={[
              styles.xAxisWrapper,
              {
                width: dimensions.chart.width - chartSpacing,
              },
            ]}
          >
            {data.xAxis.map((item, index) => (
              <View key={index} style={styles.xAxisElement}>
                <Text
                  style={[
                    styles.primaryText,
                    selected === index && styles.selectedText,
                  ]}
                >
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0C1039",
    paddingHorizontal: 15,
  },
  chartBG: {
    height: chartHeight,
    backgroundColor: "#171E5C",
    width: "100%",
    borderRadius: 8,
  },
  xAxisWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    paddingVertical: bottomAxisHeight,
  },
  xAxisElement: {
    flex: 1,
    alignItems: "center",
  },
  columnWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
  },
  innerChartWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  primaryText: {
    fontSize: 14,
    letterSpacing: 14 * 0.02,
    fontWeight: "500",
    color: "#F5F7FF",
    opacity: 0.4,
  },
  selectedText: {
    opacity: 0.8,
  },
  todaysBG: {
    backgroundColor: "#0AEAB4",
  },
  notTodayBG: {
    backgroundColor: "#535BA6",
  },
  chartColumn: {
    borderRadius: 6,
  },
});
