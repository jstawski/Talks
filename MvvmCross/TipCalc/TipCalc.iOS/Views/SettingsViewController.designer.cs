// WARNING
//
// This file has been generated automatically by Xamarin Studio to store outlets and
// actions made in the UI designer. If it is removed, they will be lost.
// Manual changes to this file may not be handled correctly.
//
using Foundation;
using System.CodeDom.Compiler;

namespace TipCalc.iOS
{
	[Register ("SettingsViewController")]
	partial class SettingsViewController
	{
		[Outlet]
		UIKit.UITextField amount { get; set; }

		[Outlet]
		UIKit.UISlider generosity { get; set; }

		[Outlet]
		UIKit.UILabel generosityAmount { get; set; }
		
		void ReleaseDesignerOutlets ()
		{
			if (amount != null) {
				amount.Dispose ();
				amount = null;
			}

			if (generosity != null) {
				generosity.Dispose ();
				generosity = null;
			}

			if (generosityAmount != null) {
				generosityAmount.Dispose ();
				generosityAmount = null;
			}
		}
	}
}
