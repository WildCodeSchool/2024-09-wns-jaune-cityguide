import type { FormEvent } from "react";
// import Select from "react-select";
import { useNavigate } from "react-router-dom";
import {
	type InterestPoint,
	type InterestPointInput,
	useDeleteInterestPointByIdMutation,
	useGetCategoriesQuery,
	useReplaceInterestPointByIdMutation,
} from "../libs/graphql/generated/graphql-types";

export default function InterestPointEditionForm(props: InterestPoint) {
	const { loading, error, data } = useGetCategoriesQuery();
	const navigate = useNavigate();
	const [replaceInterestPoint] = useReplaceInterestPointByIdMutation();
	const [deleteInterestPoint] = useDeleteInterestPointByIdMutation();

	const hSubmit = (evt: FormEvent) => {
		evt.preventDefault();

    const form = evt.target as HTMLFormElement;
		const formData = new FormData(form);
		const formJson = Object.fromEntries(formData.entries());

    const formattedData: InterestPointInput = {
      ...formJson,
			latitude: parseFloat(formJson.latitude as string),
			longitude: parseFloat(formJson.longitude as string),
		};

		replaceInterestPoint({
			variables: {
				data: formattedData,
				interestPointId: props.id.toString(),
			},
		});
	};

	const hDelete = async () => {
		await deleteInterestPoint({ variables: { interestPointId: props.id.toString() } });
		navigate("/");
	};

	if (error) return <>Error!</>;
	if (loading) return <>Loading...</>;
	if (!data) return <>We couldn't find anything to display</>;
	return (
		<main className="main-content">
			<form onSubmit={hSubmit}>
				<label>
					Name:
					<input
						className="text-field"
						name="name"
						defaultValue={props.name}
					/>
				</label>
				<label>
					Description:
					<input
						className="text-field"
						name="description"
						defaultValue={props.description}
					/>
				</label>
				<label>
					Address:
					<input
						className="text-field"
						name="address"
						defaultValue={props.address}
					/>
				</label>
				<label>
					Latitude:
					<input 
            className="text-field" 
            name="latitude" 
            type="number"
            defaultValue={props.latitude}
          />
				</label>
        <label>
					Longitude:
					<input 
            className="text-field" 
            name="longitude" 
            type="number"
            defaultValue={props.longitude}
          />
				</label>
				{/* <label>
					Picture:
					<input
						className="text-field"
						name="picture"
						defaultValue={props.picture}
					/>
				</label> */}
        <label>
					link_url:
					<input 
            className="text-field" 
            name="link_url"
            defaultValue={props.link_url} />
				</label>
				<select name="category" defaultValue={props.category.id}>
					{data.getCategories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</select>
				<label>
					City:
					<input 
            className="text-field" 
            name="city"
            defaultValue={props.city.id} />
				</label>
				<button type="submit" className="button">
					Update Interest Point!
				</button>
			</form>
			<button type="button" onClick={hDelete}>
				Delete Interest Point!
			</button>
		</main>
	);
}
