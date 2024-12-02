const Sidebar = () => {
    const roles = [
      'AI Engineer Remote',
      'Signal Processing Engineer Remote',
      'RPA Developer Remote',
      'NFT Remote',
      'Ethical Hacker Remote',
      'API Developer Remote',
    ];
  
    return (
      <div className="w-80">
        <h2 className="text-xl font-semibold mb-4">Explore other remote roles</h2>
        <ul className="space-y-2">
          {roles.map((role, index) => (
            <li key={index}>
              <a
                href="#"
                className="text-purple-800 hover:text-purple-900 text-sm"
              >
                {role}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Sidebar;