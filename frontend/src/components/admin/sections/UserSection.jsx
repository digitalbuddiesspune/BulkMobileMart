import { useEffect, useState } from "react";
import { getUsers } from "../../../api/api";
import AdminAlert from "../AdminAlert";
import { cardClass } from "../adminStyles";

function UserSection() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");
        const { data } = await getUsers();
        setUsers(data.data || []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load users. Login as admin to view registered dealers."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="mb-1 text-xl font-bold">Users</h2>
      <p className="mb-5 text-sm text-text-secondary">
        View registered dealer accounts. Login required to access this section.
      </p>

      <AdminAlert error={error} onClear={() => setError("")} />

      <h3 className="mb-3 font-semibold">All Users ({users.length})</h3>
      {loading ? (
        <p className="text-text-secondary">Loading...</p>
      ) : users.length === 0 ? (
        <p className="text-text-secondary">
          {error ? "Could not load users." : "No registered users yet."}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border-light bg-white">
          <table className="w-full min-w-[500px] text-left text-sm">
            <thead className="border-b border-border-light bg-mobile-surface">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Phone</th>
                <th className="px-4 py-3 font-semibold">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-border-light last:border-0">
                  <td className="px-4 py-3 font-medium">{user.name}</td>
                  <td className="px-4 py-3 text-text-secondary">{user.email}</td>
                  <td className="px-4 py-3 text-text-secondary">{user.phone}</td>
                  <td className="px-4 py-3 text-text-secondary">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-IN")
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className={`${cardClass} mt-6`}>
        <p className="text-sm text-text-secondary">
          User accounts are created when dealers sign up on the website.
          Admin login is required to view this list.
        </p>
      </div>
    </div>
  );
}

export default UserSection;
