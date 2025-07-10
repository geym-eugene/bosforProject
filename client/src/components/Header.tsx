import React, { FC } from "react";
import { Menu, Search, User } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/shared/library/hooks";
import { store } from "@/app/store/store";
import { logout } from "@/entities/user/model/userThunks";

const Header = () => {
  const navigate = useNavigate();

  const user = useAppSelector((store) => store.user.user);
  const dispatch = useAppDispatch();

  const handleScroll = (page: string, path: string | null) => {
    navigate(`${page}`);
    if (path) {
      setTimeout(() => {
        const projects = document.getElementById(`${path}`);
        projects.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            {/* <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              BOSFOR
            </h1> */}
            <button className="text-2xl font-bold text-gray-900 tracking-tight"
              onClick={() => handleScroll("/", "main")}
            >
              BOSFOR
            </button>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button className="text-gray-600 hover:text-gray-900 transition-colors"></button>
            <button
              onClick={() => handleScroll("/", "main")}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Главная
            </button>
            <button
              onClick={() => handleScroll("/", "projects")}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Каталог
            </button>
            <button
              onClick={() => handleScroll("/", "contacts")}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Контакты
            </button>
            <button
              onClick={() => handleScroll("/", "about")}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              О нас
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
            </button>
            Привет, {user?.username || "Гость"}!
            <button
              onClick={() => navigate("/user")}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <User className="h-5 w-5" />
            </button>
            {user && (
              <button
                onClick={() => dispatch(logout())}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Выйти
              </button>
            )}
            <button className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
