import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { Card } from "../../components/Card";

// Sample user financial data
const userData = {
  name: "UIIAI",
  income: "RM 2,850",
  strEligible: true,
  householdSize: 4,
  dependents: 2,
  location: "Selangor",
  housing: "Rented",
  monthlyCost: "RM 950",
};

export default function Index() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {userData.name}</Text>
        <Text style={styles.subheading}>Financial Summary</Text>
      </View>

      <Card 
        title="Monthly Income" 
        titleMalay="Pendapatan Bulanan"
        style={styles.incomeCard}
      >
        <Text style={styles.incomeText}>{userData.income}</Text>
        <View style={styles.eligibilityBadge}>
          <Text style={styles.eligibilityText}>
            {userData.strEligible ? "STR Eligible" : "Not STR Eligible"}
          </Text>
        </View>
      </Card>

      <Card 
        title="Household Information" 
        titleMalay="Maklumat Isi Rumah"
      >
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Household Size:</Text>
          <Text style={styles.infoValue}>{userData.householdSize} people</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Dependents:</Text>
          <Text style={styles.infoValue}>{userData.dependents}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Location:</Text>
          <Text style={styles.infoValue}>{userData.location}</Text>
        </View>
      </Card>

      <Card 
        title="Housing" 
        titleMalay="Perumahan"
      >
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Type:</Text>
          <Text style={styles.infoValue}>{userData.housing}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Monthly Cost:</Text>
          <Text style={styles.infoValue}>{userData.monthlyCost}</Text>
        </View>
      </Card>

      <View style={styles.footer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  header: {
    padding: 16,
    paddingTop: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  subheading: {
    fontSize: 16,
    color: "#8E8E93",
    marginBottom: 8,
  },
  incomeCard: {
    backgroundColor: "#F0F7FF",
  },
  incomeText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#007AFF",
    marginBottom: 8,
  },
  eligibilityBadge: {
    backgroundColor: "#34C759",
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  eligibilityText: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E5EA",
  },
  infoLabel: {
    fontSize: 16,
    color: "#8E8E93",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    height: 32,
  },
});
