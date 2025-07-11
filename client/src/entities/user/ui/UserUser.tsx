import React, {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from "@/shared/library/hooks.ts";
import {deleteFavoritesThunk, getFavoritesThunk} from "@/entities/user/model/userThunks.ts";
import {objectFav} from "@/entities/projects/model/projectType.ts";
import {useNavigate} from "react-router";
import {getAllProjectsThunk} from "@/entities/projects/model/projectThunks.ts";

function UserUser() {
    const favorites = useAppSelector(s => s.user.favorites)
    const [favoritesFilter, setFavoritesFilter] = useState<objectFav[]>([])
    const dispatch = useAppDispatch()
    const projectO = useAppSelector(s => s.project.projects)

    const deleteHandler = (id: number) => dispatch(deleteFavoritesThunk(id))

    const navigate = useNavigate()

    useEffect(() => {
        void dispatch(getAllProjectsThunk())
    }, []);

    useEffect(() => {
        void dispatch(getFavoritesThunk())

    }, [dispatch])

    useEffect(() => {
        setFavoritesFilter(favorites)
    }, [favorites]);


    const searchHandler = (eventTargetValue) => {
        setFavoritesFilter(favorites.filter(favoriteProject => favoriteProject.project.title.includes(eventTargetValue)))
    }


    return (
        <div className="max-w-3xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-semibold mb-4">Избранные</h1>

            <input
                type="text"
                placeholder="Поиск по имени или email"
                onChange={(e) => searchHandler(e.target.value)
                }
                className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <ul className="space-y-6">
                {favoritesFilter.map((favorite) => {
                    const project = favorite.project;
                    const imageUrl = projectO[project.id]?.images?.[0]?.url;

                    return (
                        <li
                            key={favorite.id}
                            className="flex flex-col md:flex-row gap-4 p-4 bg-white shadow-sm border rounded-lg"
                        >
                            {/* Картинка */}
                            {imageUrl && (
                                <img
                                    src={imageUrl}
                                    alt={project.title}
                                    className="w-full md:w-64 h-40 object-cover rounded-md"
                                />
                            )}

                            {/* Описание проекта */}
                            <div className="flex-1 space-y-2">
                                <p className="text-lg font-semibold text-gray-900">
                                    Название: {project.title}
                                </p>
                                <p className="text-sm text-gray-700">
                                    Описание: {project.description}
                                </p>
                                <p className="text-sm text-gray-700">
                                    Цена: {project.price.toLocaleString()} ₽
                                </p>
                                <p className="text-sm text-gray-700">
                                    Материал: {project.material}
                                </p>
                                <p className="text-sm text-gray-700">
                                    Этажей: {project.floors}
                                </p>

                                <button
                                    onClick={() => navigate(`/project/${projectO[project.id].id}`)}
                                    className="text-sm text-blue-600 hover:text-blue-600-800 font-medium mt-2"
                                >
                                    К проекту
                                </button>
                                <div></div>
                                {/* Кнопка удаления */}
                                <button
                                    onClick={() => deleteHandler(project.id)}
                                    className="text-sm text-red-600 hover:text-red-800 font-medium mt-2"
                                >
                                    Удалить из избранного
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>

    )
}

export default UserUser