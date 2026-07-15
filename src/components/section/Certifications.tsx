import { useDarkMode } from '../../contexts/DarkModeContext';
import { useThemeColors } from '../../hooks/useThemeColors';

const Certifications = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();

  return (
    <section id="certifications" className="py-8 relative" style={{
      background: themeColors.background.sections?.certifications || themeColors.background.gradient,
      transition: 'background 0.3s ease-in-out'
    }}>
      <div className="container mx-auto px-6 relative" style={{ zIndex: 2 }}>
        <h2 className="text-4xl font-bold text-center mb-6" style={{ color: isDarkMode ? themeColors.colors.white : themeColors.colors.pink[500] }}>Education</h2>

        <div className="max-w-4xl mx-auto space-y-4">
          <div className="bg-white/95 dark:bg-gray-800/95 border-2 border-pink-100 dark:border-gray-700 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <h3 className="text-xl font-bold" style={{ color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[400] }}>
                  Bachelor of Science in Computer Science & Engineering
                </h3>
                <p className="text-lg font-semibold mt-1" style={{ color: isDarkMode ? themeColors.colors.dark[300] : themeColors.colors.dark[600] }}>
                  United International University
                </p>
              </div>
              <span className="text-sm px-3 py-1 rounded-full" style={{
                backgroundColor: isDarkMode ? themeColors.colors.dark[800] : themeColors.colors.pink[50],
                color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[600],
                border: `1px solid ${isDarkMode ? themeColors.colors.dark[700] : themeColors.colors.pink[200]}`
              }}>
                2024 - Present
              </span>
            </div>
          </div>

          <div className="bg-white/95 dark:bg-gray-800/95 border-2 border-pink-100 dark:border-gray-700 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <h3 className="text-xl font-bold" style={{ color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[400] }}>
                  Higher Secondary Certificate (HSC)
                </h3>
                <p className="text-lg font-semibold mt-1" style={{ color: isDarkMode ? themeColors.colors.dark[300] : themeColors.colors.dark[600] }}>
                  Siddeshwari Girls' College
                </p>
              </div>
              <span className="text-sm px-3 py-1 rounded-full" style={{
                backgroundColor: isDarkMode ? themeColors.colors.dark[800] : themeColors.colors.pink[50],
                color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[600],
                border: `1px solid ${isDarkMode ? themeColors.colors.dark[700] : themeColors.colors.pink[200]}`
              }}>
                2021 - 2023
              </span>
            </div>
          </div>

          <div className="bg-white/95 dark:bg-gray-800/95 border-2 border-pink-100 dark:border-gray-700 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <h3 className="text-xl font-bold" style={{ color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[400] }}>
                  Secondary School Certificate (SSC)
                </h3>
                <p className="text-lg font-semibold mt-1" style={{ color: isDarkMode ? themeColors.colors.dark[300] : themeColors.colors.dark[600] }}>
                  South Banasree Model School
                </p>
              </div>
              <span className="text-sm px-3 py-1 rounded-full" style={{
                backgroundColor: isDarkMode ? themeColors.colors.dark[800] : themeColors.colors.pink[50],
                color: isDarkMode ? themeColors.colors.pink[300] : themeColors.colors.pink[600],
                border: `1px solid ${isDarkMode ? themeColors.colors.dark[700] : themeColors.colors.pink[200]}`
              }}>
                2019 - 2021
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom gradient overlay for smooth transition to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '60px',
          background: isDarkMode
            ? `linear-gradient(180deg, transparent 0%, ${themeColors.background.gradientEnd} 100%)`
            : `linear-gradient(180deg, transparent 0%, ${themeColors.colors.pink[25]} 100%)`,
          zIndex: 1
        }}
      />
    </section>
  );
};

export default Certifications;