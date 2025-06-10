import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

vi.mock("../../store/citiesStore.ts", () => ({
	useCitiesStore: () => ({
		setSelectedCity: vi.fn(),
	}),
}));

vi.mock("../../store/interestPointsStore.ts", () => ({
	useInterestPointsStore: () => ({
		fetchInterestPointsByCity: vi.fn(),
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

const mockError: Error | null = null;
const mockValidLogin = vi.fn().mockResolvedValue({
	data: {
		loginUser: JSON.stringify({
			email: "alice.dupont@emailcom",
			password: "user",
		}),
	},
});
vi.mock("../../libs/graphql/generated/graphql-types", () => ({
	useLoginUserMutation: () => [
		mockValidLogin,
		{ loading: false, error: mockError },
	],
}));

// Useful code snippet to render a component with react-router-dom: https://stackoverflow.com/questions/76754014/reactjs-how-to-unit-test-login-form-in-vitest
// See also: https://www.webpilot.ai/writeDetail/808ff24c-fa86-43ae-9d2d-d6cd7f40e765?lang=en-US

const renderLoginPage = () => {
	return render(
		<BrowserRouter>
			<Login />
		</BrowserRouter>,
	);
};

import { BrowserRouter } from "react-router-dom";
import Login from "./Login";

describe("Display 'login form' page", () => {
	it("renders the login form and the fields", () => {
		renderLoginPage();
		expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Mot de passe")).toBeInTheDocument();
		expect(screen.getByText("Me connecter")).toBeInTheDocument();
	});
});
