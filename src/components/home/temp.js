        <div className="comparison-section__footnote">
          <p className="comparison-section__footnote-text">
          * Comparison data based on laboratory testing and industry standards. Actual results may vary depending on specific conditions.
          </p>
          <div className="comparison-section__indicator-bars">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className={`comparison-section__indicator-bar ${index < 5 ? 'comparison-section__indicator-bar--active' : ''}`}
              ></div>
            ))}
          </div>
        </div>



comparison-section__footnote
comparison-section__footnote-text
comparison-section__indicator-bars


.comparison-section__indicator-bars {
    display: flex;
    justify-content: center;
    gap: var(--space-1);
    margin: var(--space-4) 0 var(--space-2);
  }

  .comparison-section__footnote-text {
    font-size: var(--font-size-base);
    margin-bottom: var(--space-4);
    opacity: 0.9;
  }

  .comparison-section__footnote {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 0.75rem;
    padding: var(--space-6);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 255, 255, 0.2);
    border: 1px solid rgba(0, 255, 255, 0.2);
    text-align: center;
    color: white;
  }