import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
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

describe("Display 'registration form' page", () => {
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

describe("Display errors if the input field is empty", () => {
	beforeEach(() => {
		renderRegistrationPage();
		fireEvent.click(screen.getByRole("button", { name: "M'inscrire" }));
	});
	it("displays an error message when the field 'Prénom' is empty", () => {
		expect(screen.getByText("Le prénom est requis.")).toBeInTheDocument();
	});
	it("displays an error message when the field 'Nom' is empty", () => {
		expect(screen.getByText("Le nom est requis.")).toBeInTheDocument();
	});
	it("displays an error message when the field 'Email' is empty", () => {
		expect(screen.getByText("L’email est requis.")).toBeInTheDocument();
	});
	it("displays an error message when the field 'Mot de passe' is empty", () => {
		expect(screen.getByText("Le mot de passe est requis.")).toBeInTheDocument();
	});
	it("displays an error message when the field 'Confirmer mot de passe' is empty", () => {
		expect(screen.getByText("Confirmez le mot de passe.")).toBeInTheDocument();
	});
	it("displays an error message when the field 'Ville' is empty", () => {
		expect(screen.getByText("La ville est requise.")).toBeInTheDocument();
	});
});

describe("Display errors if the input format is invalid", () => {
	beforeEach(() => {
		renderRegistrationPage();
	});
	it("displays an error message when the email format is invalid", () => {
		const emailInput = screen.getByPlaceholderText("Email");
		const invalidEmail = "invalidEmail";
		fireEvent.change(emailInput, { target: { value: invalidEmail } });
		fireEvent.click(screen.getByRole("button", { name: "M'inscrire" }));
		expect(screen.getByText("Format d’email invalide.")).toBeInTheDocument();
	});
	it("displays an error message when the password and the confirmation password do not match", () => {
		const passwordInput = screen.getByPlaceholderText("Mot de passe");
		const confirmPasswordInput = screen.getByPlaceholderText(
			"Confirmer mot de passe",
		);

		const password = "MyPassword123";
		const confirmPassword = "MyPassword1234";

		fireEvent.change(passwordInput, { target: { value: password } });
		fireEvent.change(confirmPasswordInput, {
			target: { value: confirmPassword },
		});
		fireEvent.click(screen.getByRole("button", { name: "M'inscrire" }));
		expect(
			screen.getByText("Les mots de passe ne correspondent pas."),
		).toBeInTheDocument();
	});
});
