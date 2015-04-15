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
	[Register ("TipViewController")]
	partial class TipViewController
	{
		[Outlet]
		UIKit.UISlider generosity { get; set; }

		[Outlet]
		UIKit.UIButton settings { get; set; }

		[Outlet]
		UIKit.UITextField subTotal { get; set; }

		[Outlet]
		UIKit.UILabel tip { get; set; }
		
		void ReleaseDesignerOutlets ()
		{
			if (generosity != null) {
				generosity.Dispose ();
				generosity = null;
			}

			if (subTotal != null) {
				subTotal.Dispose ();
				subTotal = null;
			}

			if (tip != null) {
				tip.Dispose ();
				tip = null;
			}

			if (settings != null) {
				settings.Dispose ();
				settings = null;
			}
		}
	}
}
