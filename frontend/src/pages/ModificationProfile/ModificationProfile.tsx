import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import {
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
} from "../../libs/graphql/generated/graphql-types";
import { useNavigate, Link } from "react-router-dom";
import { useCitiesStore } from "../../store/citiesStore";
import { User, useUserStore } from "../../store/userStore";
import background_form from "../../assets/background_form.png";

type FormDataType = {
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  city: string;
};

export default function ModificationProfile() {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  const userId = "" + user?.id || "";
  const { cities } = useCitiesStore();
  const { data, loading, error } = useGetUserByIdQuery({
    variables: { userId },
    skip: !userId,
  });

  const [formData, setFormData] = useState<FormDataType>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    city: "",
  });

  const [editableFields, setEditableFields] = useState<{
    [key in keyof FormDataType]?: boolean;
  }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (data?.getUserById) {
      const fetchedUser = data.getUserById;
      setFormData({
        firstname: fetchedUser.firstname || "",
        lastname: fetchedUser.lastname || "",
        email: fetchedUser.email || "",
        password: "",
        city: fetchedUser.city?.id?.toString() || "",
      });
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = (field: keyof FormDataType) => {
    setEditableFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await updateUser({
        variables: {
          userId: userId,
          data: {
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email || undefined,
            password: formData.password || undefined,
            city: parseInt(formData.city),
          },
        },
      });
      console.log("Ancien user:", user);
      console.log("Données mises à jour:", data!.updateUser);
      if (data?.updateUser) {
		  setUser({ ...user, ...data.updateUser } as User);
		  console.log("User mis à jour", data.updateUser);
        navigate("/map");
      }
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
      }
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible."
      )
    )
      return;
    try {
      await deleteUser({
        variables: {
          userId: userId,
        },
      });
      setUser(null); // ou reset store
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const fields: (keyof FormDataType)[] = [
    "firstname",
    "lastname",
    "email",
    "password",
  ];

  if (loading) return <>Wait a minute</>;
  if (error) return <>Oops, an error occurred</>;
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[80vh] bg-[#B0AFE4]"
      style={{ backgroundImage: `url(${background_form})` }}
    >
      <div className="flex justify-center z-2 mb-[-2rem]">
        <Link to={"/"}>
          <img
            src={logo}
            alt="City Guide logo"
            className="w-16 h-16 rounded-full border-4 border-white"
          />
        </Link>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-lg w-80 lg:w-[60vh] max-h-[75vh] overflow-y-auto z-1">
        <h2 className="text-center text-2xl font-semibold text-[#706EEB] mb-6">
          Modifier votre profil
        </h2>

        {apiError && (
          <p className="text-red-600 text-center text-sm mb-4">{apiError}</p>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 flex flex-col items-center"
        >
          {fields.map((field) => (
            <div key={field} className="w-full">
              <div className="border border-gray-300 rounded-[25px] px-3 py-2 flex items-center justify-between">
                <input
                  type={
                    field === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : "text"
                  }
                  name={field}
                  placeholder={
                    field === "password"
                      ? "Nouveau mot de passe"
                      : field === "email"
                      ? "Email"
                      : field === "firstname"
                      ? "Prénom"
                      : field === "lastname"
                      ? "Nom"
                      : field
                  }
                  value={formData[field] || ""}
                  onChange={handleChange}
                  disabled={!editableFields[field]}
                  className="w-full outline-none text-gray-800 bg-transparent"
                />
                {field === "password" ? (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-sm text-gray-500 ml-2 cursor-pointer"
                  >
                    {showPassword ? "Cacher" : "Afficher"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => toggleEdit(field)}
                    className="ml-2 text-gray-500"
                  >
                    Modifier
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="w-full">
            <div className="border border-gray-300 rounded-[25px] px-3 py-2">
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full outline-none bg-transparent text-gray-800"
              >
                <option value="" disabled>
                  Sélectionnez votre ville
                </option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full max-w-[150px] text-white py-1 rounded-[25px] bg-[#706eeb] hover:bg-[#b0afe4] mt-5"
          >
            Enregistrer
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="text-red-600 text-sm mt-4 hover:underline"
          >
            Supprimer mon compte
          </button>
        </form>
      </div>
    </div>
  );
}
