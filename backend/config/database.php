<?php
/**
 * Database Configuration & Connection
 * Akash Photography Backend
 * 
 * Defaults to SQLite for zero-setup local & portable operation,
 * with easy one-line toggle to MySQL for live production hosting.
 */

class Database {
    // Set to 'sqlite' or 'mysql'
    private static $driver = 'sqlite';

    // SQLite configuration
    private static $sqlitePath = __DIR__ . '/../db/inquiries.db';

    // MySQL configuration (if used)
    private static $mysqlHost = 'localhost';
    private static $mysqlDb   = 'akash_photography';
    private static $mysqlUser = 'root';
    private static $mysqlPass = '';
    private static $mysqlPort = 3306;

    private static $pdo = null;

    public static function getConnection() {
        if (self::$pdo === null) {
            try {
                if (self::$driver === 'sqlite') {
                    // Ensure the db folder exists
                    $dir = dirname(self::$sqlitePath);
                    if (!is_dir($dir)) {
                        mkdir($dir, 0777, true);
                    }

                    self::$pdo = new PDO('sqlite:' . self::$sqlitePath);
                    self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    self::$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

                    // Initialize tables if needed
                    self::initSqliteTables();
                } else {
                    $dsn = "mysql:host=" . self::$mysqlHost . ";port=" . self::$mysqlPort . ";dbname=" . self::$mysqlDb . ";charset=utf8mb4";
                    self::$pdo = new PDO($dsn, self::$mysqlUser, self::$mysqlPass, [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                        PDO::ATTR_EMULATE_PREPARES => false,
                    ]);
                    self::initMysqlTables();
                }
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode([
                    'success' => false,
                    'error' => 'Database connection failed: ' . $e->getMessage()
                ]);
                exit();
            }
        }
        return self::$pdo;
    }

    private static function initSqliteTables() {
        $sql = "
            CREATE TABLE IF NOT EXISTS inquiries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT NOT NULL,
                whatsapp TEXT,
                event_date TEXT NOT NULL,
                event_type TEXT NOT NULL,
                location TEXT NOT NULL,
                message TEXT NOT NULL,
                status TEXT DEFAULT 'new',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        ";
        self::$pdo->exec($sql);
    }

    private static function initMysqlTables() {
        $sql = "
            CREATE TABLE IF NOT EXISTS inquiries (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(50) NOT NULL,
                whatsapp VARCHAR(50) NULL,
                event_date VARCHAR(50) NOT NULL,
                event_type VARCHAR(100) NOT NULL,
                location VARCHAR(255) NOT NULL,
                message TEXT NOT NULL,
                status VARCHAR(50) DEFAULT 'new',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        ";
        self::$pdo->exec($sql);
    }
}
