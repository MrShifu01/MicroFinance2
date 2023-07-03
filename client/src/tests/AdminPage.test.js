import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../redux/store";
import AdminPage from "../pages/AdminPage";
import { setClients } from "../redux/clientsSlice";
import { setLoans } from "../redux/loansSlice";

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
}));

test("Clicking on 'Edit User Permissions' button opens the modal", async () => {

  // Mock the data to be returned by the axios.get calls
  const clientsData = [{ id: 1, name: "User 1" }, { id: 2, name: "User 2" }];
  const loansData = [{ id: 1, amount: 1000 }, { id: 2, amount: 2000 }];

  // Set up the initial state of the store
  store.dispatch(setClients(clientsData));
  store.dispatch(setLoans(loansData));

  // Render the component
  render(
    <Provider store={store}>
      <BrowserRouter>
        <AdminPage />
      </BrowserRouter>
    </Provider>
  );

  // Find the 'Edit User Permissions' button
  const editButton = screen.getByText("Edit User Permissions");

  // Click the 'Edit User Permissions' button
  fireEvent.click(editButton);

  // Verify that the modal is open
  const modal = screen.getByText("Edit User Permissions");
  expect(modal).toBeInTheDocument();
});
