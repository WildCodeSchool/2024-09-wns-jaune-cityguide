import { describe, it, expect, vi } from "vitest";
import {
	act,
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";

vi.mock("../../store/citiesStore.ts", () => ({
	useCitiesStore: () => ({
		cities: [{ id: "1", name: "Paris" }],
		fetchCities: vi.fn(),
	}),
}));

vi.mock("../../store/userStore", () => ({
	useUserStore: () => ({
		setUser: vi.fn(),
	}),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
	const actual = await import("react-router-dom");
	return {
		...actual,
		useNavigate: () => mockNavigate,
	};
});

let mockError: Error | null = null;
const mockValidRegister = vi.fn().mockResolvedValue({
	data: {
		registerUser: JSON.stringify({
			id: "1",
			firstname: "Alice",
			email: "alice.dupont@email.com",
			role: "user",
		}),
	},
});
vi.mock("../../libs/graphql/generated/graphql-types", () => ({
	useRegisterUserMutation: () => [
		mockValidRegister,
		{ loading: false, error: mockError },
	],
}));

// Useful code snippet to render a component with react-router-dom: https://stackoverflow.com/questions/76754014/reactjs-how-to-unit-test-login-form-in-vitest
// See also: https://www.webpilot.ai/writeDetail/808ff24c-fa86-43ae-9d2d-d6cd7f40e765?lang=en-US

const renderRegistrationPage = () => {
	return render(
		<BrowserRouter>
			<Inscription />
		</BrowserRouter>,
	);
};

import { BrowserRouter } from "react-router-dom";
import Inscription from "./Inscription";

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

describe("Submit valid form without triggering any server error", () => {
	// Workaround for the issue with useNavigate not being called: https://github.com/testing-library/react-testing-library/issues/1198
	beforeEach(() => {
		mockNavigate.mockClear();
		renderRegistrationPage();
		vi.useFakeTimers({ shouldAdvanceTime: true });
	});

	afterEach(() => {
		vi.runOnlyPendingTimers();
		vi.useRealTimers();
	});

	it("should call the registration mutation when the form is valid", async () => {
		fillValidForm();
		const submitButton = screen.getByRole("button", { name: "M'inscrire" });

		fireEvent.click(submitButton);

		await waitFor(() => expect(mockValidRegister).toHaveBeenCalled());
	});
	it("should navigate to the map page after successful registration", async () => {
		fillValidForm();
		const submitButton = screen.getByRole("button", { name: "M'inscrire" });

		fireEvent.click(submitButton);
		await waitFor(() => expect(mockValidRegister).toHaveBeenCalled());
		await act(() => vi.runAllTimers());
		await waitFor(() => {
			expect(mockNavigate).toHaveBeenCalledWith("/map");
		});
	});
	//it("should display a success message after successful registration", async () => {});
	//it("should set the user's city as the selected city after successful registration", async () => {});
	//it("should load interest points related to the selected city after successful registration", async () => {});
});

describe("Submit valid form but trigger server errors", () => {
	beforeEach(() => {
		mockValidRegister.mockClear();
		renderRegistrationPage();
	});

	it("should display an error message when the email is already used", async () => {
		mockValidRegister.mockRejectedValueOnce(
			new Error("Cet email est déjà utilisé."),
		);
		mockError = new Error("Cet email est déjà utilisé.");

		fillValidForm();
		const submitButton = screen.getByRole("button", { name: "M'inscrire" });

		await fireEvent.click(submitButton);
		await waitFor(() => expect(mockValidRegister).toHaveBeenCalled());

		await waitFor(() => {
			expect(
				screen.getByText("Cet email est déjà utilisé."),
			).toBeInTheDocument();
		});
	});
});

function fillValidForm() {
	const firstnameInput = screen.getByPlaceholderText("Prénom");
	const lastnameInput = screen.getByPlaceholderText("Nom");
	const emailInput = screen.getByPlaceholderText("Email");
	const passwordInput = screen.getByPlaceholderText("Mot de passe");
	const confirmPasswordInput = screen.getByPlaceholderText(
		"Confirmer mot de passe",
	);

	fireEvent.change(firstnameInput, {
		target: { value: "Alice" },
	});
	fireEvent.change(lastnameInput, {
		target: { value: "Dupont" },
	});
	fireEvent.change(emailInput, {
		target: { value: "alice.dupont@email.com" },
	});
	fireEvent.change(passwordInput, {
		target: { value: "password123" },
	});
	fireEvent.change(confirmPasswordInput, {
		target: { value: "password123" },
	});
	fireEvent.change(screen.getByRole("combobox"), { target: { value: "1" } });
}
