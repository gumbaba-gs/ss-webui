import React, { useState, useEffect, useRef } from 'react';
import './SustainabilityDashboard.css';

const SustainabilityDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [marketPenetration, setMarketPenetration] = useState(10);
  const [selectedTimeframe, setSelectedTimeframe] = useState('annual');
  const [animatedCounter, setAnimatedCounter] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  
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
  
  // Setup intersection observer for animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);
  
  // Counter animation effect
  useEffect(() => {
    // Only animate if the component is visible
    if (!isVisible) return;
    
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
  }, [activeTab, marketPenetration, selectedTimeframe, isVisible, metrics]);
  
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

  return (
    <div 
      ref={containerRef}
      className={`sustainability-dashboard ${isVisible ? 'visible' : ''}`}
    >
      {/* Controls */}
      <div className="dashboard-controls">
        <div className="market-penetration-control">
          <label className="control-label">
            Market Penetration: <span className="penetration-value">{marketPenetration}%</span>
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={marketPenetration}
            onChange={(e) => setMarketPenetration(parseInt(e.target.value))}
            className="penetration-slider"
          />
        </div>
        
        <div className="timeframe-control">
          <button
            onClick={() => setSelectedTimeframe('monthly')}
            className={`timeframe-button ${selectedTimeframe === 'monthly' ? 'active' : ''}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setSelectedTimeframe('annual')}
            className={`timeframe-button ${selectedTimeframe === 'annual' ? 'active' : ''}`}
          >
            Annual
          </button>
          <button
            onClick={() => setSelectedTimeframe('5year')}
            className={`timeframe-button ${selectedTimeframe === '5year' ? 'active' : ''}`}
          >
            5-Year
          </button>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="dashboard-tabs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('waste')}
          className={`tab-button ${activeTab === 'waste' ? 'active' : ''}`}
        >
          Food Waste
        </button>
        <button
          onClick={() => setActiveTab('carbon')}
          className={`tab-button ${activeTab === 'carbon' ? 'active' : ''}`}
        >
          Carbon Footprint
        </button>
        <button
          onClick={() => setActiveTab('water')}
          className={`tab-button ${activeTab === 'water' ? 'active' : ''}`}
        >
          Water Usage
        </button>
        <button
          onClick={() => setActiveTab('packaging')}
          className={`tab-button ${activeTab === 'packaging' ? 'active' : ''}`}
        >
          Packaging
        </button>
      </div>
      
      {/* Dashboard Content */}
      <div className="dashboard-content">
        {activeTab === 'overview' ? (
          /* Overview Tab */
          <div className="metrics-grid">
            <div className="metric-card waste">
              <div className="metric-icon-container">
                <span className="metric-icon">🍎</span>
              </div>
              <h3 className="metric-title">Food Waste</h3>
              <div className="metric-value">{formatNumber(metrics.foodWasteReduction)}</div>
              <p className="metric-description">pounds saved from landfill</p>
            </div>
            
            <div className="metric-card carbon">
              <div className="metric-icon-container">
                <span className="metric-icon">🌿</span>
              </div>
              <h3 className="metric-title">CO₂ Emissions</h3>
              <div className="metric-value">{formatNumber(metrics.co2Reduction)}</div>
              <p className="metric-description">metric tons reduced</p>
            </div>
            
            <div className="metric-card water">
              <div className="metric-icon-container">
                <span className="metric-icon">💧</span>
              </div>
              <h3 className="metric-title">Water Saved</h3>
              <div className="metric-value">{formatNumber(metrics.waterSaved)}</div>
              <p className="metric-description">gallons conserved</p>
            </div>
            
            <div className="metric-card packaging">
              <div className="metric-icon-container">
                <span className="metric-icon">📦</span>
              </div>
              <h3 className="metric-title">Packaging</h3>
              <div className="metric-value">{formatNumber(metrics.packagingReduction)}</div>
              <p className="metric-description">fewer packages needed</p>
            </div>
          </div>
        ) : (
          /* Individual Metric Tabs */
          <div className="detailed-metric-container">
            <div className="metric-highlight-card">
              {activeTab === 'waste' && (
                <>
                  <div className="metric-highlight-icon waste">🍎</div>
                  <h3 className="metric-highlight-title">Food Waste Reduction</h3>
                  <div className="metric-highlight-value">
                    <span className="counter">{formatNumber(animatedCounter)}</span>
                    <span className="unit">lbs</span>
                  </div>
                  <p className="metric-highlight-description">
                    Equivalent to {formatNumber(metrics.foodWasteReduction / 1.5)} meals saved
                  </p>
                </>
              )}
              
              {activeTab === 'carbon' && (
                <>
                  <div className="metric-highlight-icon carbon">🌿</div>
                  <h3 className="metric-highlight-title">CO₂ Emission Reduction</h3>
                  <div className="metric-highlight-value">
                    <span className="counter">{formatNumber(animatedCounter)}</span>
                    <span className="unit">metric tons</span>
                  </div>
                  <p className="metric-highlight-description">
                    Equivalent to taking {formatNumber(metrics.carsOffRoad)} cars off the road
                  </p>
                </>
              )}
              
              {activeTab === 'water' && (
                <>
                  <div className="metric-highlight-icon water">💧</div>
                  <h3 className="metric-highlight-title">Water Conservation</h3>
                  <div className="metric-highlight-value">
                    <span className="counter">{formatNumber(animatedCounter)}</span>
                    <span className="unit">gallons</span>
                  </div>
                  <p className="metric-highlight-description">
                    Could fill {formatNumber(metrics.swimPools)} Olympic swimming pools
                  </p>
                </>
              )}
              
              {activeTab === 'packaging' && (
                <>
                  <div className="metric-highlight-icon packaging">📦</div>
                  <h3 className="metric-highlight-title">Packaging Reduction</h3>
                  <div className="metric-highlight-value">
                    <span className="counter">{formatNumber(animatedCounter)}</span>
                    <span className="unit">packages</span>
                  </div>
                  <p className="metric-highlight-description">
                    Stacked, would reach {formatNumber(metrics.packagingReduction / 12000)} times the height of Mount Everest
                  </p>
                </>
              )}
            </div>
            
            <div className="impact-visualization">
              <h3 className="visualization-title">Projected Impact Over Time</h3>
              <div className="chart-placeholder">
                <div className="chart-message">
                  <p>This area would display an interactive chart showing the projected impact of {activeTab === 'waste' ? 'food waste reduction' : activeTab === 'carbon' ? 'carbon emission reduction' : activeTab === 'water' ? 'water conservation' : 'packaging reduction'} over time based on the selected market penetration rate.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Environmental Equivalents section */}
      <div className="environmental-equivalents">
        <h3 className="equivalents-title">Environmental Impact Equivalents</h3>
        <div className="equivalents-grid">
          <div className="equivalent-card trees">
            <div className="equivalent-icon">🌳</div>
            <div className="equivalent-value">{formatNumber(metrics.treesEquivalent)}</div>
            <p className="equivalent-description">Trees planted for one year</p>
          </div>
          
          <div className="equivalent-card cars">
            <div className="equivalent-icon">🚗</div>
            <div className="equivalent-value">{formatNumber(metrics.carsOffRoad)}</div>
            <p className="equivalent-description">Cars taken off the road</p>
          </div>
          
          <div className="equivalent-card homes">
            <div className="equivalent-icon">🏠</div>
            <div className="equivalent-value">{formatNumber(metrics.homesPowered)}</div>
            <p className="equivalent-description">Homes powered for a year</p>
          </div>
          
          <div className="equivalent-card pools">
            <div className="equivalent-icon">🏊</div>
            <div className="equivalent-value">{formatNumber(metrics.swimPools)}</div>
            <p className="equivalent-description">Olympic swimming pools</p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-footnote">
        <p>
          *Calculations based on industry averages and scientific research on food waste impact.
          Actual results may vary based on specific implementation and regional factors.
        </p>
      </div>
    </div>
  );
};

export default SustainabilityDashboard;