export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-center py-6 mt-12 border-t dark:border-gray-800">
      <p className="text-gray-600 dark:text-gray-300">
        © {new Date().getFullYear()} EventPlanner. All rights reserved.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Built by <strong>Rodyna Amr Fathy</strong>
      </p>
    </footer>
  );
}
