# StudyMate Figma

Пакет содержит 20 low-fidelity экранов. Все основные истории и состояния ошибок покрыты. Экраны не утверждают, что backend или SDU SSO уже работают.

## Native Figma

Native файл уже создан: https://www.figma.com/design/zmbupAy7b2AJs3NMX6D8fg. Все ссылки и стартовые сценарии находятся в NATIVE_FIGMA_LINKS.md. Повторный импорт не требуется. Есть 20 редактируемых экранов, 126 переходов и три flows.

Резервный автоматический импорт: в Figma Desktop создайте пустой Design file. Через меню Plugins / Development / Import plugin from manifest выберите figma-import/manifest.json. Запустите StudyMate Milestone Wireframes. Если Figma требует plugin ID, создайте Development / New plugin и используйте назначенный Figma ID в manifest.json. Не придумывайте ID. Код создаёт новую страницу, 20 редактируемых frames и все переходы. Он не удаляет существующие страницы, не обращается к сети и не запрашивает пароль.

После запуска выберите 03_browse, нажмите Present. При необходимости задайте стартовый frame в Prototype. Проверьте основной путь: Browse → Details → Apply → Pending → Organizer → Review → Accept → Accepted. Затем Reset и ветку Reject → Rejected. Проверьте регистрации, sign in, профиль, создание группы и состояния ошибок.

Перед сдачей включите доступ для просмотра преподавателем и проверьте prototype URL из NATIVE_FIGMA_LINKS.md в браузере без авторизации. Экран Browse визуально проверен в Figma; все 20 экранов проверены на выход элементов за границы при создании переходов. Дополнительные screenshots остановлены лимитом Starter. Пройдите в Present подачу заявки, принятие, отказ и исправление ошибок. Резервный development-importer проверен локально на mock API; основной native файл создан напрямую через Figma.

## Экраны и scope

01 Register, 02 Sign in, 03 Browse, 04 Preferences, 05 Create group, 06 Details, 07 Apply, 08 Pending requests, 09 Organizer requests, 10 Review, 11 Accepted, 12 Rejected, 13 Missing application answer, 14 Past meeting time, 15 My groups, 16 Registration error, 17 Sign-in error, 18 Empty browse, 19 Organizer accepted, 20 Organizer rejected.

HTML открывается локально двойным кликом. Это репетиция фиксированных состояний, а не приложение и не замена Figma. SVG подходят для импорта как отдельные редактируемые vector assets. Requirements: интерфейс по текущему SRS, без рейтингов, capacity, auto-accept и выдуманной SDU-интеграции.

Предложенные решения: public group details, Beginner/Intermediate/Advanced, полное покрытие интервала встречи и равенство непустых наборов preferences. Команда должна их подтвердить. Пример встречи — 12 октября 2026 года в Asia/Almaty; это демонстрационные данные.
