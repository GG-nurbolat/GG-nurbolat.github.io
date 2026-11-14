// Все ссылки и версии меняются только здесь.
window.GG = {
  github: "https://github.com/USER/REPO",
  oldVersionsRepo: "https://github.com/USER/ggipes-old-versions",
  downloadPage: "files.html", // можно заменить на адрес внешнего сайта с файлами
  // Если у платформы заполнен url, кнопка откроет его. Пока пусто: покажется окно «Скоро выйдет».
  platforms: [
    { id: "windows", name: "Windows", note: "Windows 10 и 11", url: "" },
    { id: "macos", name: "macOS", note: "macOS 12 и новее", url: "" },
    { id: "linux", name: "Linux", note: "x64, AppImage", url: "" }
  ],
  // Файлы для страницы files.html (ссылки на Google Диск)
  files: [
    { platform: "Windows", version: "0.1.0", size: "120 МБ", url: "https://drive.google.com/file/d/FILE_ID/view" },
    { platform: "macOS", version: "", size: "", url: "" },
    { platform: "Linux", version: "", size: "", url: "" }
  ]
};
