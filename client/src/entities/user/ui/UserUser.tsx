import React, {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from "@/shared/library/hooks.ts";
import {deleteFavoritesThunk, getFavoritesThunk} from "@/entities/user/model/userThunks.ts";
import {objectFav} from "@/entities/projects/model/projectType.ts";

function UserUser() {
    const favorites = useAppSelector(s => s.user.favorites)
    const [favoritesFilter, setFavoritesFilter] = useState<objectFav[]>([])
    const dispatch = useAppDispatch()

    const deleteHandler = (id: number) => dispatch(deleteFavoritesThunk(id))

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
                placeholder="Поиск по имени или email (TODO пока не работает)"
                onChange={(e) => searchHandler(e.target.value)
                }
                className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <ul className="space-y-4">
                {favoritesFilter.map((favorite) => (
                    <li
                        key={favorite.id}
                        className="flex items-center justify-between p-4 bg-white shadow-sm border rounded-md"
                    >
                        <div>
                            <p className="font-medium">Название: {favorite.project.title}</p>
                            <p className="text-sm text-gray-500">Описание: {favorite.project.description}</p>
                            <p className="text-sm text-gray-500">Цена: {favorite.project.price}</p>
                            <p className="text-sm text-gray-500">Материал: {favorite.project.material}</p>
                            <p className="text-sm text-gray-500">Этажи: {favorite.project.floors}</p>
                        </div>
                        <button
                            onClick={() => deleteHandler(favorite.project.id)}
                            className="text-blue-600 hover:text-blue-800 font-medium transition"
                        >
                            Удалить из избранного
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UserUser