
using System;

using Foundation;
using UIKit;
using Cirrious.MvvmCross.Touch.Views;
using Cirrious.MvvmCross.Binding.BindingContext;
using TipCalc.Core.ViewModels;

namespace TipCalc.iOS
{
	public partial class TipViewController : MvxViewController
	{
		public TipViewController() : base("TipViewController", null)
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

			var set = this.CreateBindingSet<TipViewController, Core.ViewModels.TipViewModel>();
			set.Bind(subTotal).To(vm => vm.SubTotal);
			set.Bind(generosity).To(vm => vm.Generosity);
			set.Bind(tip).To(vm => vm.Tip);
			set.Bind(settings).To(vm => vm.Settings);
			set.Apply();
		}
	}
}

