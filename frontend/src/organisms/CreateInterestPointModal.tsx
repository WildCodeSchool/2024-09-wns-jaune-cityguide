import { useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
	type InterestPointInput,
	useCreateInterestPointMutation,
	useGetCategoriesQuery,
} from "../libs/graphql/generated/graphql-types";

export default function CreateInterestPointModal() {
	const { loading, error, data } = useGetCategoriesQuery();
	const [createInterestPoint, { data: dataSub, loading: subLoading, error: subError }] =
		useCreateInterestPointMutation();

	const navigate = useNavigate();

	const hSubmit = (evt: FormEvent) => {
		evt.preventDefault();

		createInterestPoint({ variables: { data: InterestPointInput } });
	};

	useEffect(() => {
		if (!dataSub) return;
		navigate(`/ads/${dataSub.createInterestPoint.id}`);
	}, [dataSub, navigate]);

	if (error || subError) return <>Error!</>;
	if (loading) return <>Loading...</>;
	if (!data) return <>We couldn't find anything to display</>;
	return (
		<main className="main-content">
			<form onSubmit={hSubmit}>
				<label>
					Name:
					<input className="text-field" name="name" />
				</label>
				<label>
					Description:
					<input className="text-field" name="description" />
				</label>
				<label>
					Address:
					<input className="text-field" name="address" />
				</label>
				<label>
					Latitude:
					<input className="text-field" name="latitude" type="number" />
				</label>
        <label>
					Longitude:
					<input className="text-field" name="longitude" type="number" />
				</label>
				<label>
					Picture:
					<input className="text-field" name="picture" />
				</label>
				<label>
					link_url:
					<input className="text-field" name="link_url" />
				</label>
				<select name="category">
					{data.getCategories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</select>
				<label>
					City:
					<input className="text-field" name="city" />
				</label>
				<button type="submit" className="button" disabled={subLoading}>
					Create Interest Point!
				</button>
			</form>
		</main>
	);
}
