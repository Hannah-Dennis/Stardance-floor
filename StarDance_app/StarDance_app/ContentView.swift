//
//  ContentView.swift
//  StarDance_app
//
//  Created by Player HD on 03/10/2026.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Image(systemName: "globe")
                .imageScale(.large)
                .foregroundStyle(.tint)
            Text("Hello,this is for stardance.")
        }
        .padding()
        HStack{
            Text("Hi")
            Text("Hi")
                .foregroundStyle(.blue)
        }
    }
}

#Preview {
    ContentView()
}
