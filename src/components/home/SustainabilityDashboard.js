import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const SustainabilityDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [marketPenetration, setMarketPenetration] = useState(10);
  const [selectedTimeframe, setSelectedTimeframe] = useState('annual');
  const [animatedCounter, setAnimatedCounter] = useState(0);
  
  // Calculate metrics based on market penetration
  const calculateMetrics = (penetration) => {
    const factor = penetration / 10; // Base calculations on 10% penetration
    
    // Base metrics (annual at 10% market penetration)
    const baseMetrics = {
      foodWasteReduction: 500000000, // 500M pounds of produce saved
      co2Reduction: 1200000, // 1.2M metric tons CO2 equivalent
      waterSaved: 840000000, // 840M gallons of water
      packagingReduction: 25000000, // 25M packages reduced
      landfillReduction: 430000000, // 430M pounds of waste diverted from landfill
      transportEfficiency: 15, // 15% reduction in transportation emissions
    };
    
    // Scale based on selected timeframe
    const timeframeMultiplier = selectedTimeframe === 'annual' ? 1 : 
                               selectedTimeframe === 'monthly' ? 1/12 : 
                               selectedTimeframe === '5year' ? 5 : 1;
    
    // Return calculated metrics
    return {
      foodWasteReduction: Math.round(baseMetrics.foodWasteReduction * factor * timeframeMultiplier),
      co2Reduction: Math.round(baseMetrics.co2Reduction * factor * timeframeMultiplier),
      waterSaved: Math.round(baseMetrics.waterSaved * factor * timeframeMultiplier),
      packagingReduction: Math.round(baseMetrics.packagingReduction * factor * timeframeMultiplier),
      landfillReduction: Math.round(baseMetrics.landfillReduction * factor * timeframeMultiplier),
      transportEfficiency: baseMetrics.transportEfficiency,
      
      // Calculated comparisons for visualization
      treesEquivalent: Math.round(baseMetrics.co2Reduction * factor * timeframeMultiplier / 48),
      carsOffRoad: Math.round(baseMetrics.co2Reduction * factor * timeframeMultiplier / 4.6),
      homesPowered: Math.round(baseMetrics.co2Reduction * factor * timeframeMultiplier / 7.5),
      swimPools: Math.round(baseMetrics.waterSaved * factor * timeframeMultiplier / 20000),
    };
  };
  
  // Generate metrics based on current settings
  const metrics = calculateMetrics(marketPenetration);
  
  // Chart colors using theme variables
  const COLORS = [
    'var(--primary-color)',
    'var(--secondary-color)',
    'var(--warning)',
    'var(--accent-color)'
  ];
  
  // Counter animation effect
  useEffect(() => {
    // Animate the main counter value based on active tab
    let targetValue;
    switch (activeTab) {
      case 'waste':
        targetValue = metrics.foodWasteReduction;
        break;
      case 'carbon':
        targetValue = metrics.co2Reduction;
        break;
      case 'water':
        targetValue = metrics.waterSaved;
        break;
      case 'packaging':
        targetValue = metrics.packagingReduction;
        break;
      default:
        targetValue = metrics.foodWasteReduction;
        break;
    }
    
    // Reset counter first
    setAnimatedCounter(0);
    
    // Animate counter
    const duration = 1500; // ms
    const interval = 30; // ms
    const steps = duration / interval;
    const increment = targetValue / steps;
    let current = 0;
    let step = 0;
    
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      // Easing function for smoother animation
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      current = Math.min(targetValue, Math.floor(targetValue * easedProgress));
      setAnimatedCounter(current);
      
      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, [activeTab, marketPenetration, selectedTimeframe]);
  
  // Comparison data for bar chart
  const comparisonData = [
    {
      name: 'Food Waste',
      conventional: 100,
      spanex: 100 - (100 * marketPenetration / 100 * 0.75),
    },
    {
      name: 'CO₂ Emissions',
      conventional: 100,
      spanex: 100 - (100 * marketPenetration / 100 * 0.62),
    },
    {
      name: 'Water Usage',
      conventional: 100,
      spanex: 100 - (100 * marketPenetration / 100 * 0.45),
    },
    {
      name: 'Packaging',
      conventional: 100,
      spanex: 100 - (100 * marketPenetration / 100 * 0.38),
    },
  ];
  
  // Projection data for line chart
  const generateProjectionData = () => {
    const years = selectedTimeframe === '5year' ? 5 : 10;
    return Array.from({ length: years + 1 }, (_, i) => {
      const yearPenetration = Math.min(100, marketPenetration * Math.pow(1.4, i));
      const yearMetrics = calculateMetrics(yearPenetration);
      return {
        year: 2025 + i,
        foodWaste: yearMetrics.foodWasteReduction,
        co2: yearMetrics.co2Reduction,
        water: yearMetrics.waterSaved / 1000000, // Convert to millions
        packaging: yearMetrics.packagingReduction / 1000000, // Convert to millions
        penetration: yearPenetration.toFixed(1),
      };
    });
  };
  
  const projectionData = generateProjectionData();
  
  // Carbon footprint breakdown data for pie chart
  const carbonBreakdownData = [
    { name: 'Transportation Reduction', value: 42 },
    { name: 'Reduced Production', value: 31 },
    { name: 'Less Refrigeration', value: 18 },
    { name: 'Other Benefits', value: 9 },
  ];

  // Format large numbers for display
  const formatNumber = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    } else {
      return num.toString();
    }
  };
  
  // Format percentage for display
  const formatPercent = (decimal) => {
    return (decimal * 100).toFixed(0) + '%';
  };
  
  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-blue-100 p-4 border border-border shadow-md rounded-md">
          <p className="font-bold">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' 
                ? entry.name.includes('Penetration') 
                  ? entry.value.toFixed(1) + '%' 
                  : formatNumber(entry.value)
                : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  // Get the main metric display based on active tab
  const getMainMetricDisplay = () => {
    let value, label, icon, color, unit, comparison;
    
    switch (activeTab) {
      case 'waste':
        value = metrics.foodWasteReduction;
        label = "Food Waste Reduction";
        icon = "🍎";
        color = "bg-success-10 text-success";
        unit = "lbs";
        comparison = `Equivalent to ${formatNumber(value / 1.5)} meals saved`;
        break;
      case 'carbon':
        value = metrics.co2Reduction;
        label = "CO₂ Emission Reduction";
        icon = "🌿";
        color = "bg-info-10 text-info";
        unit = "metric tons";
        comparison = `Equivalent to taking ${formatNumber(metrics.carsOffRoad)} cars off the road`;
        break;
      case 'water':
        value = metrics.waterSaved;
        label = "Water Conservation";
        icon = "💧";
        color = "bg-info-10 text-info";
        unit = "gallons";
        comparison = `Could fill ${formatNumber(metrics.swimPools)} Olympic swimming pools`;
        break;
      case 'packaging':
        value = metrics.packagingReduction;
        label = "Packaging Reduction";
        icon = "📦";
        color = "bg-warning-10 text-warning";
        unit = "packages";
        comparison = `Stacked, would reach ${formatNumber(value / 12000)} times the height of Mount Everest`;
        break;
      default:
        value = metrics.foodWasteReduction;
        label = "Food Waste Reduction";
        icon = "🍎";
        color = "bg-success-10 text-success";
        unit = "lbs";
        comparison = `Equivalent to ${formatNumber(value / 1.5)} meals saved`;
    }
    
    return (
      <div className="text-center p-6 bg-blue-100 rounded-lg shadow-md">
        <div className={`inline-flex items-center justify-center p-3 ${color} rounded-full mb-4`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <h3 className="text-xl font-bold mb-3">{label}</h3>
        <div className="text-4xl font-bold mb-2 flex items-center justify-center">
          <span className="tabular-nums">{formatNumber(animatedCounter)}</span>
          <span className="text-sm ml-2 text-gray-500">{unit}</span>
        </div>
        <p className="text-gray-600 text-sm">{comparison}</p>
      </div>
    );
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto p-6 rounded-xl" 
      style={{
        background: "linear-gradient(45deg, rgba(11, 61, 145, 0.05), rgba(0, 255, 255, 0.1))",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 255, 255, 0.2)",
        border: "1px solid rgba(0, 255, 255, 0.2)"
      }}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-text mb-2">Sustainability Impact Dashboard</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Visualize the environmental benefits of Spanex shelf-life extension technology at various adoption levels
        </p>
      </div>
      
      {/* Controls */}
      <div className="bg-blue-100 p-4 rounded-lg shadow-md mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Market Penetration: {marketPenetration}%
            </label>
            <input
              type="range"
              min="1"
              max="100"
              value={marketPenetration}
              onChange={(e) => setMarketPenetration(parseInt(e.target.value))}
              className="w-full md:w-64"
            />
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedTimeframe('monthly')}
              className={`px-4 py-2 rounded-md ${selectedTimeframe === 'monthly' 
                ? 'bg-primary text-background' 
                : 'bg-surface text-text'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setSelectedTimeframe('annual')}
              className={`px-4 py-2 rounded-md ${selectedTimeframe === 'annual' 
                ? 'bg-primary text-background' 
                : 'bg-surface text-text'}`}
            >
              Annual
            </button>
            <button
              onClick={() => setSelectedTimeframe('5year')}
              className={`px-4 py-2 rounded-md ${selectedTimeframe === '5year' 
                ? 'bg-primary text-background' 
                : 'bg-surface text-text'}`}
            >
              5-Year
            </button>
          </div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex flex-wrap border-b border-border mb-8">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-2 px-4 font-medium text-sm rounded-t-lg ${
            activeTab === 'overview' 
              ? 'bg-blue-100 border-l border-t border-r border-border text-primary' 
              : 'text-gray-500 hover:text-text'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('waste')}
          className={`py-2 px-4 font-medium text-sm rounded-t-lg ${
            activeTab === 'waste' 
              ? 'bg-blue-100 border-l border-t border-r border-border text-primary' 
              : 'text-gray-500 hover:text-text'
          }`}
        >
          Food Waste
        </button>
        <button
          onClick={() => setActiveTab('carbon')}
          className={`py-2 px-4 font-medium text-sm rounded-t-lg ${
            activeTab === 'carbon' 
              ? 'bg-blue-100 border-l border-t border-r border-border text-primary' 
              : 'text-gray-500 hover:text-text'
          }`}
        >
          Carbon Footprint
        </button>
        <button
          onClick={() => setActiveTab('water')}
          className={`py-2 px-4 font-medium text-sm rounded-t-lg ${
            activeTab === 'water' 
              ? 'bg-blue-100 border-l border-t border-r border-border text-primary' 
              : 'text-gray-500 hover:text-text'
          }`}
        >
          Water Usage
        </button>
        <button
          onClick={() => setActiveTab('packaging')}
          className={`py-2 px-4 font-medium text-sm rounded-t-lg ${
            activeTab === 'packaging' 
              ? 'bg-blue-100 border-l border-t border-r border-border text-primary' 
              : 'text-gray-500 hover:text-text'
          }`}
        >
          Packaging
        </button>
      </div>
      {/* Dashboard Content */}
      {activeTab === 'overview' ? (
        /* Overview Tab */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-100 p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <div className="bg-success-10 p-2 rounded-full mr-2">
                <span className="text-success text-lg">🍎</span>
              </div>
              <h3 className="font-bold">Food Waste</h3>
            </div>
            <div className="text-3xl font-bold mb-1">{formatNumber(metrics.foodWasteReduction)}</div>
            <p className="text-sm text-gray-600">pounds saved from landfill</p>
          </div>
          
          <div className="bg-blue-100 p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <div className="bg-info-10 p-2 rounded-full mr-2">
                <span className="text-info text-lg">🌿</span>
              </div>
              <h3 className="font-bold">CO₂ Emissions</h3>
            </div>
            <div className="text-3xl font-bold mb-1">{formatNumber(metrics.co2Reduction)}</div>
            <p className="text-sm text-gray-600">metric tons reduced</p>
          </div>
          
          <div className="bg-blue-100 p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <div className="bg-info-10 p-2 rounded-full mr-2">
                <span className="text-info text-lg">💧</span>
              </div>
              <h3 className="font-bold">Water Saved</h3>
            </div>
            <div className="text-3xl font-bold mb-1">{formatNumber(metrics.waterSaved)}</div>
            <p className="text-sm text-gray-600">gallons conserved</p>
          </div>
          
          <div className="bg-blue-100 p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <div className="bg-warning-10 p-2 rounded-full mr-2">
                <span className="text-warning text-lg">📦</span>
              </div>
              <h3 className="font-bold">Packaging</h3>
            </div>
            <div className="text-3xl font-bold mb-1">{formatNumber(metrics.packagingReduction)}</div>
            <p className="text-sm text-gray-600">fewer packages needed</p>
          </div>
        </div>
      ) : (
        /* Individual Metric Tabs */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1">
            {getMainMetricDisplay()}
          </div>
          
          <div className="md:col-span-2 bg-blue-100 p-4 rounded-lg shadow-md">
            <h3 className="font-bold mb-4">Projected Impact Over Time</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={projectionData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  {activeTab === 'waste' && (
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="foodWaste" 
                      name="Food Waste Saved (lbs)" 
                      stroke="var(--success)" 
                      activeDot={{ r: 8 }} 
                    />
                  )}
                  {activeTab === 'carbon' && (
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="co2" 
                      name="CO₂ Reduction (tons)" 
                      stroke="var(--info)" 
                      activeDot={{ r: 8 }} 
                    />
                  )}
                  {activeTab === 'water' && (
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="water" 
                      name="Water Saved (M gallons)" 
                      stroke="var(--info)" 
                      activeDot={{ r: 8 }} 
                    />
                  )}
                  {activeTab === 'packaging' && (
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="packaging" 
                      name="Packaging Reduced (M units)" 
                      stroke="var(--warning)" 
                      activeDot={{ r: 8 }} 
                    />
                  )}
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="penetration" 
                    name="Market Penetration (%)" 
                    stroke="var(--border-color)" 
                    strokeDasharray="5 5" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
      
      {/* Additional Visualizations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
          <h3 className="font-bold mb-4">Industry Comparison</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={comparisonData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Relative Impact (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="conventional" name="Without Spanex" fill="var(--error)" />
                <Bar dataKey="spanex" name="With Spanex" fill="var(--success)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
          <h3 className="font-bold mb-4">Carbon Footprint Reduction Breakdown</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={carbonBreakdownData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="var(--primary-color)"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {carbonBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Environmental Equivalents */}
      <div className="mt-8 bg-blue-100 p-6 rounded-lg shadow-md">
        <h3 className="font-bold mb-4 text-center text-xl">Environmental Impact Equivalents</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-success-10 rounded-lg">
            <div className="text-4xl mb-2">🌳</div>
            <div className="text-2xl font-bold text-success">{formatNumber(metrics.treesEquivalent)}</div>
            <p className="text-sm text-gray-600">Trees planted for one year</p>
          </div>
          
          <div className="text-center p-4 bg-info-10 rounded-lg">
            <div className="text-4xl mb-2">🚗</div>
            <div className="text-2xl font-bold text-info">{formatNumber(metrics.carsOffRoad)}</div>
            <p className="text-sm text-gray-600">Cars taken off the road</p>
          </div>
          
          <div className="text-center p-4 bg-warning-10 rounded-lg">
            <div className="text-4xl mb-2">🏠</div>
            <div className="text-2xl font-bold text-warning">{formatNumber(metrics.homesPowered)}</div>
            <p className="text-sm text-gray-600">Homes powered for a year</p>
          </div>
          
          <div className="text-center p-4 bg-info-10 rounded-lg">
            <div className="text-4xl mb-2">🏊</div>
            <div className="text-2xl font-bold text-info">{formatNumber(metrics.swimPools)}</div>
            <p className="text-sm text-gray-600">Olympic swimming pools</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          *Calculations based on industry averages and scientific research on food waste impact.
          Actual results may vary based on specific implementation and regional factors.
        </p>
      </div>
    </div>
  );
};

export default SustainabilityDashboard;