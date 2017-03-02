var config = {
    mysql: {
        database: 'hkw', // 使用哪个数据库
        username: 'root', // 用户名
        password: '', // 口令
        host: 'hankewei.xyz', // 主机名
        port: 3306 // 端口号，MySQL默认3306
    },
    session: {
        key: 'hankewei.xyz',
        maxAge: 86400000,
        overwrite: true,
        httpOnly: true,
        signed: true,
    }
};

module.exports = config;