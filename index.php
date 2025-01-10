<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notes Every Day</title>
    <link rel="stylesheet" href="/components/scss/custom.css"> <!-- Add this line to include your stylesheet -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar -->
            <div class="col-2 sidebar">
                <?php include("components/sidebar.html"); ?>
            </div>
            <!-- Main Content -->
            <div class="col-10 main-content">
                <?php
                $page = isset($_GET['page']) ? $_GET['page'] : 'home';
                if ($page == 'notes') {
                    echo '<div class="row">';
                    echo '<div class="col-4">';
                    include("components/note-list.html");
                    echo '</div>';
                    echo '<div class="col-8">';
                    include("components/note-editor.html");
                    echo '</div>';
                    echo '</div>';
                } elseif ($page == 'tasks') {
                    include("components/tasks.html");
                } elseif ($page == 'login') {
                    include("login.php");
                } elseif ($page == 'register') {
                    include("register.php");
                } elseif ($page == 'trash') {
                    include("components/trash.html");
                } else {
                    include("components/home.html");
                }
                ?>
            </div>
        </div>
    </div>
    <script src="/js/notes.js"></script>
    <script src="/js/login.js"></script>
    <script src="/js/tasks.js"></script>
    <script src="/js/trash.js"></script>
    <script src="/js/register.js"></script>
</body>
</html>
