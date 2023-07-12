import '@testing-library/jest-dom';
import { render as reactTestingLibraryRender, screen } from '@testing-library/react';
import App from 'app/App';
import { BrowserRouter } from 'react-router-dom';
import store from "store/store";
import { Provider } from 'react-redux';


const render = (component: JSX.Element) => {
  return reactTestingLibraryRender(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  )
}

test('renders learn react link', () => {
  render(<App />);
  const Element = screen.getByText(/Исторические/i);
  expect(Element).toBeInTheDocument();

});
