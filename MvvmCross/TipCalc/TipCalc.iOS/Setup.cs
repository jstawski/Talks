using Cirrious.CrossCore.Platform;
using Cirrious.MvvmCross.ViewModels;
using Cirrious.MvvmCross.Touch.Platform;
using UIKit;
using Cirrious.CrossCore;

namespace TipCalc.iOS
{
	public class Setup : MvxTouchSetup
	{
		public Setup(MvxApplicationDelegate applicationDelegate, UIWindow window)
            : base(applicationDelegate, window)
		{
		}

		protected override void InitializeFirstChance()
		{
			base.InitializeFirstChance();
			Mvx.LazyConstructAndRegisterSingleton<Acr.MvvmCross.Plugins.Settings.ISettingsService, Acr.MvvmCross.Plugins.Settings.Touch.TouchSettingsService>();
		}

		protected override IMvxApplication CreateApp()
		{
			return new Core.App();
		}
		
        protected override IMvxTrace CreateDebugTrace()
        {
            return new DebugTrace();
        }
	}
}