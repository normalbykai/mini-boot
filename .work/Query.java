import java.sql.*;

public class Query {
    public static void main(String[] args) throws Exception {
        String url = "jdbc:mysql://127.0.0.1:3306/ruoyi-vue-pro?useSSL=false&serverTimezone=Asia/Shanghai&allowPublicKeyRetrieval=true&characterEncoding=UTF-8";
        try (Connection c = DriverManager.getConnection(url, "root", "root");
             Statement s = c.createStatement()) {
            for (String sql : args) {
                System.out.println("=== " + sql);
                try (ResultSet rs = s.executeQuery(sql)) {
                    ResultSetMetaData md = rs.getMetaData();
                    int n = md.getColumnCount();
                    while (rs.next()) {
                        StringBuilder sb = new StringBuilder();
                        for (int i = 1; i <= n; i++) {
                            if (i > 1) sb.append(" | ");
                            sb.append(md.getColumnLabel(i)).append("=").append(rs.getString(i));
                        }
                        System.out.println(sb);
                    }
                } catch (SQLException e) {
                    System.out.println("ERR: " + e.getMessage());
                }
            }
        }
    }
}
