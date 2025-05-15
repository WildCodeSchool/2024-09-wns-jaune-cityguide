import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Inscription from "./Inscription";

// Useful code snippet to render a component with react-router-dom: https://stackoverflow.com/questions/76754014/reactjs-how-to-unit-test-login-form-in-vitest
// See also: https://www.webpilot.ai/writeDetail/808ff24c-fa86-43ae-9d2d-d6cd7f40e765?lang=en-US

const renderRegistrationPage = () => {
	return render(
		<BrowserRouter>
			<Inscription />
		</BrowserRouter>,
	);
};

vi.mock("../../store/citiesStore.ts", () => ({
	useCitiesStore: () => ({
		cities: [{ id: "1", name: "Paris" }],
		fetchCities: vi.fn(),
	}),
}));

vi.mock("../../libs/graphql/generated/graphql-types.ts", () => ({
	useRegisterUserMutation: () => [vi.fn().mockResolvedValue({ data: null })],
}));

describe("Test 'registration form' page", () => {
	it("renders the registration form and the fields", () => {
		renderRegistrationPage();

		expect(screen.getByPlaceholderText("Prénom")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Nom")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Mot de passe")).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText("Confirmer mot de passe"),
		).toBeInTheDocument();
		expect(screen.getByText("Sélectionnez votre ville")).toBeInTheDocument();
	});
});
