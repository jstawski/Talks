
using System;

using Foundation;
using UIKit;
using Cirrious.MvvmCross.Touch.Views;
using Cirrious.MvvmCross.Binding.BindingContext;

namespace TipCalc.iOS
{
	public partial class SettingsViewController : MvxViewController
	{
		public SettingsViewController() : base("SettingsViewController", null)
		{
		}

		public override void DidReceiveMemoryWarning()
		{
			// Releases the view if it doesn't have a superview.
			base.DidReceiveMemoryWarning();
			
			// Release any cached data, images, etc that aren't in use.
		}

		public override void ViewDidLoad()
		{
			base.ViewDidLoad();
			
			// Perform any additional setup after loading the view, typically from a nib.
			var set = this.CreateBindingSet<SettingsViewController, Core.ViewModels.SettingsViewModel>();
			set.Bind(amount).To(vm => vm.SubTotal);
			set.Bind(generosity).To(vm => vm.Generosity);
			set.Bind(generosityAmount).To(vm => vm.Generosity);
			set.Apply();
		}
	}
}

