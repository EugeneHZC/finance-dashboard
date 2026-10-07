import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChangeIndicator } from '../src/components/ChangeIndicator/ChangeIndicator';
import { StatusChip } from '../src/components/StatusChip/StatusChip';
import { TRUE_MINUS } from '../src/lib/money';

describe('ChangeIndicator component', () => {
  it('renders positive change with arrow and explicit plus sign', () => {
    render(<ChangeIndicator currentMinor={12000} previousMinor={10000} />);
    const el = screen.getByLabelText(/Increased by/i);
    expect(el).toBeInTheDocument();
    expect(el).toHaveTextContent('+$20.00 (+20.0%)');
  });

  it('renders negative change with arrow and true minus sign', () => {
    render(<ChangeIndicator currentMinor={8000} previousMinor={10000} />);
    const el = screen.getByLabelText(/Decreased by/i);
    expect(el).toBeInTheDocument();
    expect(el).toHaveTextContent(`${TRUE_MINUS}$20.00 (${TRUE_MINUS}20.0%)`);
  });

  it('renders neutral state when current equals previous', () => {
    render(<ChangeIndicator currentMinor={10000} previousMinor={10000} />);
    expect(screen.getByText('$0.00 (0.0%)')).toBeInTheDocument();
  });
});

describe('StatusChip component', () => {
  it('renders with both icon and text label for gain', () => {
    const { container } = render(<StatusChip status="gain" label="On track" />);
    expect(screen.getByText('On track')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with both icon and text label for loss', () => {
    const { container } = render(<StatusChip status="loss" label="Over budget" />);
    expect(screen.getByText('Over budget')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
