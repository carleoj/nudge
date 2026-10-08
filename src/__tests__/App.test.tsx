import '@testing-library/jest-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import App from '../renderer/App';

describe('App', () => {
  it('renders the Nudge home screen', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Nudge' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add reminder' })).toBeInTheDocument();
  });

  it('opens the add reminder modal and adds a reminder', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Add reminder' }));
    fireEvent.change(screen.getByPlaceholderText('Finish portfolio redesign'), { target: { value: 'Read a chapter' } });
    const dialog = screen.getByRole('dialog');
    fireEvent.click(within(dialog).getByRole('button', { name: 'Add reminder' }));
    expect(screen.getByText('Read a chapter')).toBeInTheDocument();
  });

  it('requires confirmation before deleting a reminder', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Delete Finish portfolio redesign' }));
    expect(screen.getByText('Delete?')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Confirm delete Finish portfolio redesign' }));
    expect(screen.queryByText('Finish portfolio redesign')).not.toBeInTheDocument();
  });
});
