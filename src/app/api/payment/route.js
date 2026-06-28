// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const body = await req.json();

//     console.log("BODY:", body);

//     const amount = Number(body.amount);

//     if (!amount || amount <= 0) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Invalid amount",
//         },
//         { status: 400 }
//       );
//     }

//     const tran_id = Date.now().toString();

//     const formData = new FormData();

//     // Store Info
//     formData.append("store_id", process.env.STORE_ID);
//     formData.append(
//       "store_passwd",
//       process.env.STORE_PASSWORD
//     );

//     // Payment Info
//     formData.append(
//       "total_amount",
//       amount.toString()
//     );

//     formData.append("currency", "BDT");
//     formData.append("tran_id", tran_id);

//     // URLs
//     formData.append(
//       "success_url",
//       `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`
//     );

//     formData.append(
//       "fail_url",
//       `${process.env.NEXT_PUBLIC_BASE_URL}/payment/fail`
//     );

//     formData.append(
//       "cancel_url",
//       `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`
//     );

//     formData.append(
//       "ipn_url",
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/ipn`
//     );

//     // Customer Info
//     formData.append(
//       "cus_name",
//       body.name || "Customer"
//     );

//     formData.append(
//       "cus_email",
//       body.email || "customer@test.com"
//     );

//     formData.append(
//       "cus_add1",
//       "Dhaka"
//     );

//     formData.append(
//       "cus_add2",
//       "Dhaka"
//     );

//     formData.append(
//       "cus_city",
//       "Dhaka"
//     );

//     formData.append(
//       "cus_state",
//       "Dhaka"
//     );

//     formData.append(
//       "cus_postcode",
//       "1207"
//     );

//     formData.append(
//       "cus_country",
//       "Bangladesh"
//     );

//     formData.append(
//       "cus_phone",
//       body.phone || "01700000000"
//     );

//     formData.append(
//       "cus_fax",
//       "01700000000"
//     );

//     // Shipping Info
//     formData.append(
//       "ship_name",
//       body.name || "Customer"
//     );

//     formData.append(
//       "ship_add1",
//       "Dhaka"
//     );

//     formData.append(
//       "ship_add2",
//       "Dhaka"
//     );

//     formData.append(
//       "ship_city",
//       "Dhaka"
//     );

//     formData.append(
//       "ship_state",
//       "Dhaka"
//     );

//     formData.append(
//       "ship_postcode",
//       "1207"
//     );

//     formData.append(
//       "ship_country",
//       "Bangladesh"
//     );

//     // Product Info
//     formData.append(
//       "shipping_method",
//       "Courier"
//     );

//     formData.append(
//       "product_name",
//       "Beauty Products"
//     );

//     formData.append(
//       "product_category",
//       "Cosmetics"
//     );

//     formData.append(
//       "product_profile",
//       "general"
//     );

//     formData.append(
//       "product_amount",
//       "1"
//     );

//     const response = await fetch(
//       "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
//       {
//         method: "POST",
//         body: formData,
//       }
//     );

//     const data = await response.json();

//     console.log("SSL RESPONSE:", data);

//     if (!data.GatewayPageURL) {
//       return NextResponse.json(
//         {
//           success: false,
//           message:
//             data.failedreason ||
//             "SSLCommerz Error",
//           sslResponse: data,
//         },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       url: data.GatewayPageURL,
//     });

//   } catch (error) {
//     console.log("PAYMENT ERROR:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const amount = Number(body.amount);

    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid amount",
        },
        { status: 400 }
      );
    }

    const tran_id = Date.now().toString();

    const formData = new FormData();

    // Store Info
    formData.append("store_id", process.env.STORE_ID);
    formData.append("store_passwd", process.env.STORE_PASSWORD);

    // Payment Info
    formData.append("total_amount", amount.toString());
    formData.append("currency", "BDT");
    formData.append("tran_id", tran_id);

    // URLs
    formData.append(
      "success_url",
      `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`
    );

    formData.append(
      "fail_url",
      `${process.env.NEXT_PUBLIC_BASE_URL}/payment/fail`
    );

    formData.append(
      "cancel_url",
      `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`
    );

    formData.append(
      "ipn_url",
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/ipn`
    );

    // Customer Info
    formData.append("cus_name", body.name || "Customer");
    formData.append("cus_email", body.email || "customer@test.com");
    formData.append("cus_add1", "Dhaka");
    formData.append("cus_add2", "Dhaka");
    formData.append("cus_city", "Dhaka");
    formData.append("cus_state", "Dhaka");
    formData.append("cus_postcode", "1207");
    formData.append("cus_country", "Bangladesh");
    formData.append("cus_phone", body.phone || "01700000000");
    formData.append("cus_fax", "01700000000");

    // Shipping Info
    formData.append("ship_name", body.name || "Customer");
    formData.append("ship_add1", "Dhaka");
    formData.append("ship_add2", "Dhaka");
    formData.append("ship_city", "Dhaka");
    formData.append("ship_state", "Dhaka");
    formData.append("ship_postcode", "1207");
    formData.append("ship_country", "Bangladesh");

    // Product Info
    formData.append("shipping_method", "Courier");
    formData.append("product_name", "Beauty Products");
    formData.append("product_category", "Cosmetics");
    formData.append("product_profile", "general");
    formData.append("product_amount", "1");

    const response = await fetch(
      "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    console.log("SSL RESPONSE:", data);

    if (!data.GatewayPageURL) {
      return NextResponse.json(
        {
          success: false,
          message: data.failedreason || "SSLCommerz Error",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      url: data.GatewayPageURL,
    });

  } catch (error) {
    console.log("PAYMENT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}