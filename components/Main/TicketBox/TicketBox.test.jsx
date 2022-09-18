/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import TicketBox from './TicketBox';



  
describe('testing the ticketbox', () => {
    afterEach(cleanup)
    it('Value in state is changed when button clicked', () => {
        const { getByText } = render(<TicketBox />);
    
        expect(getByText(/0/i).textContent).toBe("0")
    
        fireEvent.click(getByText("Buy 1 ticket for 0.01 GOERLI"))
    
        expect(getByText(/1/i).textContent).toBe("1")
     })
})

