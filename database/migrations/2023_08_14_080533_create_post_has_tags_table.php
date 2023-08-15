<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('post_has_tags', function (Blueprint $table) {
            $table->uuid('id')->unique()->primary();

            // foreign keys
            $table->foreignUuid('post_id')->references('id')->on('posts')->cascadeOnDelete();
            $table->foreignUuid('tag_id')->references('id')->on('tags')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post_has_tags');
    }
};
