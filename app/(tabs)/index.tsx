import { Feather } from '@expo/vector-icons';
import React, { useState } from "react";
import { Animated, Dimensions, Easing, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BarChart, LineChart, PieChart, ProgressChart } from "react-native-chart-kit";
import { Card } from "../../components/Card";

// Sample user financial data
const userData = {
  name: "Wyhang",
  income: "RM 2,850.30",
  strEligible: true,
  householdSize: 4,
  dependents: 2,
  location: "Selangor",
  housing: "Rented",
  monthlyCost: "RM 950",
  profileImage: "https://upload.wikimedia.org/wikipedia/commons/0/07/Tralalero_Tralala_on_the_beach.webp", // Placeholder image

  // Financial trend data
  financialTrends: {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    cashIn: [2800, 2850, 2830, 2850, 3050, 2850],
    cashOut: [2750, 2800, 2950, 2700, 2900, 2800]
  },
  
  // Spending allocation data - Modified to include RM suffix in name for legend
  spendingAllocation: [
    {
      name: `Food (RM ${950})`,
      amount: 950,
      color: "#00FFAEFF",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12
    },
    {
      name: `Housing (RM ${950})`,
      amount: 950,
      color: "#30E7FFFF",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12
    },
    {
      name: `Transport (RM ${350})`,
      amount: 350,
      color: "#5856D6",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12
    },
    {
      name: `Utilities (RM ${250})`,
      amount: 250,
      color: "#4534C7FF",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12
    },
    {
      name: `Others (RM ${300})`,
      amount: 300,
      color: "#007AFF",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12
    }
  ],

  // AI suggestions data
  aiSuggestions: {
    income: "Based on your income level, you qualify for several assistance programs. Consider applying for Bantuan Sara Hidup (BSH) which could provide up to RM1,000 quarterly.",
    household: "With 4 members in your household, you're eligible for the full STR amount. Adding your dependents in your MySTR application could increase your aid by RM200 per dependent.",
    housing: "Your rent-to-income ratio is 33%, which is above the recommended 30%. Consider applying for Program Perumahan Rakyat (PPR) to reduce housing costs by up to 30%.",
    cashFlow: "Your income slightly increased in May, but expenses also rose in March and May. Aim for a consistent savings buffer of at least RM100 monthly by reducing 'Others' spending.",
    spending: "Food and Housing make up 67% of your expenses. Explore cheaper grocery options or meal prepping. Reducing 'Others' spending by 10% could save RM30 monthly."
  },
  
  // Additional data for infographics
  affordabilityRatio: 0.33,
  incomePercentile: 25,
  eligiblePrograms: 7,
  householdComposition: {
    adults: 2,
    children: 2
  },
  rentComparisonData: {
    yourRent: 950,
    averageRent: 1200,
    affordableRent: 855
  }
};

const screenWidth = Dimensions.get("window").width - 32;

const chartConfig = {
  backgroundGradientFrom: "#FFFFFF",
  backgroundGradientTo: "#FFFFFF",
  color: (opacity = 1) => `rgba(2, 132, 199, ${opacity})`, // theme.primary
  strokeWidth: 2,
  decimalPlaces: 0,
  propsForDots: {
    r: "4",
    strokeWidth: "2",
  }
};

// Color theme
const theme = {
  primary: "#0284C7", // Blue
  secondary: "#20D4BCFF", // Light blue
  background: "#F0F9FF",
  text: "#0C4A6E",
  textLight: "#64748B",
  cardBackground: "#FFFFFDFF",
  red: "#EF6644FF", // Red
};

export default function Index() {
  // State for expandable cards
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [animations] = useState({
    income: new Animated.Value(0),
    household: new Animated.Value(0),
    housing: new Animated.Value(0)
  });

  // Toggle card expansion
  const toggleCardExpansion = (cardId: string) => {
    const isExpanding = expandedCard !== cardId;
    
    // Close any open card
    if (expandedCard) {
      Animated.timing(animations[expandedCard as keyof typeof animations], {
        toValue: 0,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false
      }).start();
    }
    
    // Open selected card or close if it was already open
    if (isExpanding) {
      setExpandedCard(cardId);
      Animated.timing(animations[cardId as keyof typeof animations], {
        toValue: 1,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false
      }).start();
    } else {
      setExpandedCard(null);
    }
  };

  // Get max height for animations
  const getMaxHeight = (cardId: string) => {
    return animations[cardId as keyof typeof animations].interpolate({
      inputRange: [0, 1],
      outputRange: [0, 350] // Adjust based on content
    });
  };

  // Render card expansion toggle button
  const renderToggleButton = (cardId: string) => {
    const isExpanded = expandedCard === cardId;
    return (
      <TouchableOpacity 
        style={styles.toggleButton} 
        onPress={() => toggleCardExpansion(cardId)}
      >
        {isExpanded ? 
          <Feather name="chevron-up" size={20} color={theme.textLight} /> : 
          <Feather name="chevron-down" size={20} color={theme.textLight} />
        }
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image 
            source={{ uri: userData.profileImage }} 
            style={styles.profileImage} 
          />
          <View style={styles.greetingContainer}>
            <Text style={[styles.greeting, { color: theme.text }]}>Hello, {userData.name}</Text>
            <Text style={[styles.subheading, { color: theme.textLight }]}>Financial Summary</Text>
          </View>
        </View>
      </View>

      <Card 
        title={
          <View style={styles.cardTitleContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Feather name="dollar-sign" size={18} color={theme.primary} style={styles.titleIcon} />
              <Text style={styles.cardTitle}>Monthly Income</Text>
            </View>
            {renderToggleButton('income')}
          </View>
        }
        style={styles.incomeCard}
      >
        <View style={styles.cardHeader}>
          <Feather name="dollar-sign" size={24} color={theme.primary} />
          <Text style={styles.incomeText}>{userData.income}</Text>
        </View>
        <View style={styles.eligibilityBadge}>
          <Text style={styles.eligibilityText}>
            {userData.strEligible ? "STR Eligible" : "Not STR Eligible"}
          </Text>
        </View>
        
        {/* Expandable content */}
        <Animated.View style={{ maxHeight: getMaxHeight('income'), overflow: 'hidden' }}>
          <View style={styles.expandedSection}>
            <View style={styles.divider} />
            
            {/* AI Suggestions Section */}
            <View style={styles.aiSuggestionContainer}>
              <View style={styles.sectionHeader}>
                <Feather name="zap" size={18} color={theme.secondary} />
                <Text style={[styles.sectionTitle, { color: theme.secondary }]}>AI Insights</Text>
              </View>
              <Text style={styles.aiSuggestionText}>{userData.aiSuggestions.income}</Text>
            </View>
            
            {/* Income Percentile Chart */}
            <View style={styles.infoGraphicSection}>
              <View style={styles.sectionHeader}>
                <Feather name="bar-chart-2" size={18} color={theme.primary} />
                <Text style={styles.sectionTitle}>Income Bracket</Text>
              </View>
              
              <View style={styles.percentileContainer}>
                <Text style={styles.percentileLabel}>Your income is in the:</Text>
                <View style={styles.percentileBar}>
                  <View style={[styles.percentileFill, { width: `${userData.incomePercentile}%` }]} />
                  <View style={styles.percentileMarker} />
                </View>
                <View style={styles.percentileLabelsContainer}>
                  <Text style={styles.percentileRangeText}>B40</Text>
                  <Text style={styles.percentileRangeText}>M40</Text>
                  <Text style={styles.percentileRangeText}>T20</Text>
                </View>
                <Text style={styles.percentileValueText}>
                  Bottom {userData.incomePercentile}% of Malaysian households
                </Text>
              </View>
            </View>
            
            {/* Eligible Programs */}
            <View style={styles.infoGraphicSection}>
              <View style={styles.sectionHeader}>
                <Feather name="award" size={18} color={theme.primary} />
                <Text style={styles.sectionTitle}>Aid Eligibility</Text>
              </View>
              
              <View style={styles.programsContainer}>
                <Text style={styles.eligibleProgramsCount}>
                  <Text style={{ fontSize: 32, fontWeight: '700', color: theme.secondary }}>
                    {userData.eligiblePrograms}
                  </Text> programs
                </Text>
                <Text style={styles.eligibilityNote}>
                  you may be eligible for based on your income
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </Card>

      <Card 
        title={
          <View style={styles.cardTitleContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Feather name="users" size={18} color={theme.primary} style={styles.titleIcon} />
              <Text style={styles.cardTitle}>Household Information</Text>
            </View>
            {renderToggleButton('household')}
          </View>
        }
        style={styles.standardCard}
      >
        <View style={styles.infoRow}>
          <View style={styles.iconLabelContainer}>
            <Feather name="users" size={18} color={theme.primary} style={styles.icon} />
            <Text style={styles.infoLabel}>Household Size:</Text>
          </View>
          <Text style={styles.infoValue}>{userData.householdSize} people</Text>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.iconLabelContainer}>
            <Feather name="heart" size={18} color={theme.primary} style={styles.icon} />
            <Text style={styles.infoLabel}>Dependents:</Text>
          </View>
          <Text style={styles.infoValue}>{userData.dependents}</Text>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.iconLabelContainer}>
            <Feather name="map-pin" size={18} color={theme.primary} style={styles.icon} />
            <Text style={styles.infoLabel}>Location:</Text>
          </View>
          <Text style={styles.infoValue}>{userData.location}</Text>
        </View>
        
        {/* Expandable content */}
        <Animated.View style={{ maxHeight: getMaxHeight('household'), overflow: 'hidden' }}>
          <View style={styles.expandedSection}>
            <View style={styles.divider} />
            
            {/* AI Suggestions Section */}
            <View style={styles.aiSuggestionContainer}>
              <View style={styles.sectionHeader}>
                <Feather name="zap" size={18} color={theme.secondary} />
                <Text style={[styles.sectionTitle, { color: theme.secondary }]}>AI Insights</Text>
              </View>
              <Text style={styles.aiSuggestionText}>{userData.aiSuggestions.household}</Text>
            </View>
            
            {/* Household Composition Chart */}
            <View style={styles.infoGraphicSection}>
              <View style={styles.sectionHeader}>
                <Feather name="pie-chart" size={18} color={theme.primary} />
                <Text style={styles.sectionTitle}>Household Composition</Text>
              </View>
              
              <View style={styles.householdCompositionChart}>
                <ProgressChart
                  data={{
                    data: [userData.householdComposition.adults / userData.householdSize, 
                           userData.householdComposition.children / userData.householdSize]
                  }}
                  width={screenWidth * 0.6}
                  height={120}
                  chartConfig={{
                    backgroundColor: "transparent",
                    backgroundGradientFrom: "white",
                    backgroundGradientTo: "white",
                    color: (opacity = 1) => `rgba(2, 132, 199, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(2, 132, 199, ${opacity})`,
                    strokeWidth: 2
                  }}
                  hideLegend={true}
                  style={styles.compositionChart}
                />
                <View style={styles.compositionLegend}>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: theme.primary }]} />
                    <Text style={styles.legendText}>{userData.householdComposition.adults} Adults</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: theme.secondary }]} />
                    <Text style={styles.legendText}>{userData.householdComposition.children} Children</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
      </Card>

      <Card 
        title={
          <View style={styles.cardTitleContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Feather name="home" size={18} color={theme.primary} style={styles.titleIcon} />
              <Text style={styles.cardTitle}>Housing</Text>
            </View>
            {renderToggleButton('housing')}
          </View>
        }
        style={styles.standardCard}
      >
        <View style={styles.infoRow}>
          <View style={styles.iconLabelContainer}>
            <Feather name="home" size={18} color={theme.primary} style={styles.icon} />
            <Text style={styles.infoLabel}>Type:</Text>
          </View>
          <Text style={styles.infoValue}>{userData.housing}</Text>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.iconLabelContainer}>
            <Feather name="credit-card" size={18} color={theme.primary} style={styles.icon} />
            <Text style={styles.infoLabel}>Monthly Cost:</Text>
          </View>
          <Text style={styles.infoValue}>{userData.monthlyCost}</Text>
        </View>
        
        {/* Expandable content */}
        <Animated.View style={{ maxHeight: getMaxHeight('housing'), overflow: 'hidden' }}>
          <View style={styles.expandedSection}>
            <View style={styles.divider} />
            
            {/* AI Suggestions Section */}
            <View style={styles.aiSuggestionContainer}>
              <View style={styles.sectionHeader}>
                <Feather name="zap" size={18} color={theme.secondary} />
                <Text style={[styles.sectionTitle, { color: theme.secondary }]}>AI Insights</Text>
              </View>
              <Text style={styles.aiSuggestionText}>{userData.aiSuggestions.housing}</Text>
            </View>
            
            {/* Affordability Ratio */}
            <View style={styles.infoGraphicSection}>
              <View style={styles.sectionHeader}>
                <Feather name="percent" size={18} color={theme.primary} />
                <Text style={styles.sectionTitle}>Rent-to-Income Ratio</Text>
              </View>
              
              <View style={styles.affordabilityContainer}>
                <View style={styles.gaugeContainer}>
                  <View style={styles.gaugeBackground}>
                    <View 
                      style={[
                        styles.gaugeFill, 
                        { 
                          width: `${userData.affordabilityRatio * 100}%`,
                          backgroundColor: userData.affordabilityRatio > 0.3 ? theme.red : theme.secondary
                        }
                      ]} 
                    />
                  </View>
                  <View style={styles.thresholdMarker} />
                </View>
                <View style={styles.gaugeLabels}>
                  <Text style={styles.gaugeValue}>{Math.round(userData.affordabilityRatio * 100)}%</Text>
                  <Text style={styles.gaugeThreshold}>30% threshold</Text>
                </View>
                <Text style={styles.affordabilityNote}>
                  {userData.affordabilityRatio > 0.3 
                    ? 'Your rent is higher than the recommended 30% of income' 
                    : 'Your rent is within the recommended range'}
                </Text>
              </View>
            </View>
            
            {/* Rent Comparison */}
            <View style={styles.infoGraphicSection}>
              <View style={styles.sectionHeader}>
                <Feather name="bar-chart" size={18} color={theme.primary} />
                <Text style={styles.sectionTitle}>Rent Comparison</Text>
              </View>
              
              <BarChart
                data={{
                  labels: ["Your Rent", "Area Avg", "Affordable"],
                  datasets: [{
                    data: [
                      userData.rentComparisonData.yourRent,
                      userData.rentComparisonData.averageRent,
                      userData.rentComparisonData.affordableRent
                    ]
                  }]
                }}
                width={screenWidth}
                height={180}
                yAxisLabel="" // Added missing prop
                yAxisSuffix=" RM"
                chartConfig={{
                  backgroundColor: '#FFFFFF',
                  backgroundGradientFrom: '#FFFFFF',
                  backgroundGradientTo: '#FFFFFF',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(2, 132, 199, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  barPercentage: 0.7,
                }}
                style={styles.barChart}
              />
            </View>
          </View>
        </Animated.View>
      </Card>

      <Card 
        title="Financial Trends"
        style={styles.standardCard}
      >
        <View style={styles.chartSection}>
          <View style={styles.chartTitleContainer}>
            <Feather name="trending-up" size={18} color={theme.primary} style={styles.icon} />
            <Text style={[styles.chartTitle, { color: theme.text }]}>Monthly Cash Flow</Text>
          </View>
          
          <LineChart
            data={{
              labels: userData.financialTrends.months,
              datasets: [
                {
                  data: userData.financialTrends.cashIn,
                  color: (opacity = 1) => theme.secondary,
                  strokeWidth: 3
                },
                {
                  data: userData.financialTrends.cashOut,
                  color: (opacity = 1) => theme.red,
                  strokeWidth: 2
                }
              ],
              legend: ["Income", "Expenses"]
            }}
            width={screenWidth}
            height={180}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
          {/* Static AI Insight for Line Chart */}
          <View style={styles.staticInsightContainer}>
            <View style={styles.sectionHeader}>
              <Feather name="zap" size={16} color={theme.secondary} />
              <Text style={[styles.sectionTitle, { color: theme.secondary, fontSize: 15 }]}>AI Insights</Text>
            </View>
            <Text style={styles.aiSuggestionText}>{userData.aiSuggestions.cashFlow}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.chartSection}>
          <View style={styles.chartTitleContainer}>
            <Feather name="pie-chart" size={18} color={theme.primary} style={styles.icon} />
            <Text style={[styles.chartTitle, { color: theme.text }]}>Monthly Spending</Text>
          </View>
          
          <View style={styles.pieChartContainer}>
            <PieChart
              data={userData.spendingAllocation}
              width={screenWidth}
              height={200}
              chartConfig={chartConfig}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
              style={styles.chart}
            />
          </View>
          {/* Static AI Insight for Pie Chart */}
          <View style={styles.staticInsightContainer}>
            <View style={styles.sectionHeader}>
              <Feather name="zap" size={16} color={theme.secondary} />
              <Text style={[styles.sectionTitle, { color: theme.secondary, fontSize: 15 }]}>AI Insights</Text>
            </View>
            <Text style={styles.aiSuggestionText}>{userData.aiSuggestions.spending}</Text>
          </View>
        </View>
      </Card>

      <View style={styles.footer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: 24,
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    borderWidth: 2,
    borderColor: theme.primary,
  },
  greetingContainer: {
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4,
  },
  subheading: {
    fontSize: 16,
    marginBottom: 4,
  },
  incomeCard: {
    backgroundColor: theme.cardBackground,
    borderLeftWidth: 10,
    borderLeftColor: theme.primary,
  },
  standardCard: {
    backgroundColor: theme.cardBackground,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  incomeText: {
    fontSize: 32,
    fontWeight: "700",
    color: theme.primary,
    marginLeft: 8,
  },
  eligibilityBadge: {
    backgroundColor: theme.secondary,
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
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 0,
    borderBottomColor: "#E5E5EA",
  },
  iconLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  infoLabel: {
    fontSize: 16,
    color: theme.textLight,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.text,
  },
  footer: {
    height: 32,
  },
  chartSection: {
    marginVertical: 8,
  },
  chartTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.text,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginVertical: 16,
  },
  pieChartContainer: {
    alignItems: 'center',
  },
  cardTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  titleIcon: {
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: theme.text,
  },
  toggleButton: {
    padding: 4,
  },
  expandedSection: {
    paddingTop: 8,
    paddingBottom: 12,
  },
  aiSuggestionContainer: {
    marginVertical: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.text,
    marginLeft: 6,
  },
  aiSuggestionText: {
    fontSize: 14,
    lineHeight: 20,
    color: theme.text,
  },
  staticInsightContainer: {
    marginTop: 12,
    padding: 10,
    backgroundColor: theme.background, // Slightly different background
    borderRadius: 8,
  },
  infoGraphicSection: {
    marginTop: 16,
    marginBottom: 8,
  },
  percentileContainer: {
    marginTop: 8,
  },
  percentileLabel: {
    fontSize: 14,
    color: theme.textLight,
    marginBottom: 8,
  },
  percentileBar: {
    height: 10,
    backgroundColor: '#E5E5EA',
    borderRadius: 5,
    position: 'relative',
    marginVertical: 8,
  },
  percentileFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.secondary,
    borderRadius: 5,
  },
  percentileMarker: {
    position: 'absolute',
    left: '40%',
    top: -5,
    width: 2,
    height: 20,
    backgroundColor: theme.textLight,
  },
  percentileLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
    paddingHorizontal: 4,
  },
  percentileRangeText: {
    fontSize: 12,
    color: theme.textLight,
  },
  percentileValueText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.secondary,
    marginTop: 8,
    textAlign: 'center',
  },
  programsContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  eligibleProgramsCount: {
    fontSize: 16,
    textAlign: 'center',
  },
  eligibilityNote: {
    fontSize: 14,
    color: theme.textLight,
    textAlign: 'center',
    marginTop: 4,
  },
  householdCompositionChart: {
    alignItems: 'center',
    marginTop: 8,
  },
  compositionChart: {
    marginVertical: 8,
  },
  compositionLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendText: {
    fontSize: 14,
    color: theme.textLight,
  },
  affordabilityContainer: {
    marginTop: 12,
  },
  gaugeContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  gaugeBackground: {
    height: 12,
    backgroundColor: '#E5E5EA',
    borderRadius: 6,
    overflow: 'hidden',
  },
  gaugeFill: {
    height: '100%',
  },
  thresholdMarker: {
    position: 'absolute',
    left: '30%',
    top: -4,
    width: 2,
    height: 20,
    backgroundColor: '#000',
  },
  gaugeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  gaugeValue: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.text,
  },
  gaugeThreshold: {
    fontSize: 14,
    color: theme.textLight,
  },
  affordabilityNote: {
    fontSize: 14,
    color: theme.textLight,
    marginTop: 8,
    textAlign: 'center',
  },
  barChart: {
    marginTop: 8,
    borderRadius: 8,
  },
});
